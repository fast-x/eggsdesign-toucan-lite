import type { NextApiRequest, NextApiResponse } from 'next';
import { addCommentToPost, deletePostById, getPostById } from '../../../../scripts/api';

type Data = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const posts = await getPostById(req.query.postId as string);
    res.status(200).json({ posts });
  } else if (req.method === 'POST') {
    const comment = await addCommentToPost(
      req.query.postId as string,
      req.body.commentText as string,
      req.body.userId as string,
    );
    res.status(200).json({ comment });
  } else if (req.method === 'DELETE') {
    const posts = await deletePostById(req.query.postId as string);
    res.status(200).json({ posts });
  }
}
