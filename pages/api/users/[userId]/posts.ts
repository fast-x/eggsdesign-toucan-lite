import formidable, { File } from 'formidable';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTag, getPostsByAuthorId, uploadAsset } from '../../../../scripts/api';
import { splitStringToArray } from '../../../../scripts/helpers';
import client from '../../../../scripts/sanity.cli';
import { Post } from '../../../../types';

type Data = {
  posts: Post[];
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to parse form' } as any);
        return;
      }

      // Ensure files exist and explicitly type them
      const fileEntries = Object.values(files || {}) as unknown as File[];

      const uploadedImages = await Promise.all(
        fileEntries.map(async (image) => {
          if (!image || !image.filepath) {
            return {};
          }

          const file = await fs.readFile(image.filepath);
          const { uploadId, name, _id } = await uploadAsset('image', file);

          return {
            _type: 'image',
            _key: uploadId,
            name,
            asset: {
              _type: 'reference',
              _ref: _id,
            },
          };
        }),
      );

      const parsedTags = splitStringToArray(fields.tags as unknown as string);

      const tags = await Promise.all(
        parsedTags.map(async (tag: string) => {
          const tagID = await createTag(tag);
          return {
            _type: 'reference',
            _ref: tagID,
          };
        }),
      );

      await client.create({
        _type: 'toucanPost',
        title: fields.title,
        description: fields.description,
        tags,
        author: {
          _ref: fields.authorId,
        },
        images: uploadedImages.filter((img) => Object.keys(img).length > 0),
      });

      const posts = await getPostsByAuthorId(req.query.userId as string);
      res.status(200).json({ posts });
    });
  } else if (req.method === 'GET') {
    const posts = await getPostsByAuthorId(req.query.userId as string);
    res.status(200).json({ posts });
  }
}
