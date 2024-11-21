import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../../scripts/api";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = await getAllPosts();
  res.status(200).json([...posts]);
}
