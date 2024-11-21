import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCommentInPost } from '../../../../../scripts/api';

type Data = {};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'DELETE') {
    const post = await deleteCommentInPost(req.query.postId as string, req.query.commentKey as string);
    res.status(200).json({ post });
  }
}
