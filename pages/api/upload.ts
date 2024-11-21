import formidable, { File } from 'formidable';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadAsset } from '../../scripts/api';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Form parse error' });
      return;
    }

    // Ensure files are not undefined and get the first file
    const fileEntries = Object.values(files || {});
    if (!fileEntries.length) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const images = fileEntries[0] as unknown as File;

    // Ensure images is defined
    if (!images || !images.filepath) {
      res.status(400).json({ error: 'Invalid file data' });
      return;
    }

    // Read the file and upload
    try {
      const fileBuffer = await fs.readFile(images.filepath);
      const response = await uploadAsset('image', fileBuffer);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'File processing error', details: error });
    }
  });
}
