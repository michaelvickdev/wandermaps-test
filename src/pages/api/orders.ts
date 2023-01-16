// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import api from '@/utils/api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const post = await api.post('orders', req.body);
    console.log(post);
    res.status(200).json(post.data)
    
  } catch (error: any) {
    res.status(500).json({ message: error.message })    
  }
}
