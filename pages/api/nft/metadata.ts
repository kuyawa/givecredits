import { NextApiRequest, NextApiResponse } from 'next';

export default async function getMetadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log('Metadata URI', req.query.url)
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;
  try {
    const result = await fetch(url);
    const metadata = await result.json();
    //console.log('Metadata', metadata)
    return res.status(200).json(metadata);
  } catch (ex) {
    console.error(ex);
    return res.status(404).json({ error: 'Metadata not found' });
  }
}
