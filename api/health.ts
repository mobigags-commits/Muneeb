import { setCorsHeaders } from './_geminiClient';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'ok',
    academy: 'Shaheen Al Zaitoon Online Quran Academy',
    location: 'Rawalpindi, Pakistan',
    founder: 'Muneeb Ur Rehman',
    inMemoryOf: 'Zaitoon Bibi',
    whatsapp: '03447956085',
    runtime: 'Vercel Serverless / Node.js',
    timestamp: new Date().toISOString(),
  });
}
