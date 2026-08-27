import { getGeminiClient, setCorsHeaders } from './_geminiClient';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, prompt, language } = body;
    const userPrompt = message || prompt;

    if (!userPrompt || typeof userPrompt !== 'string' || !userPrompt.trim()) {
      return res.status(400).json({ error: 'Prompt or message is required' });
    }

    const aiClient = getGeminiClient();

    if (!aiClient) {
      return res.status(200).json({
        response: `✨ *Shaheen Al Zaitoon Online Quran Academy* ✨\n📖 1-on-1 Quran Nazra, Tajweed & Hifz Classes\n✅ 3-Day Free Trial\n✅ Certified Qaris & Qarias from Rawalpindi\n📲 WhatsApp: 03447956085`,
      });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt.trim(),
      config: {
        systemInstruction: `You are an expert Islamic copywriter and communications advisor for Shaheen Al Zaitoon Online Quran Academy & Ecosystem (Rawalpindi, Pakistan). Provide respectful, engaging, well-formatted Islamic text with WhatsApp contact (03447956085) and EasyPaisa payment info when relevant.`,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      response: response.text || 'Assalamu Alaikum! Shaheen Al Zaitoon Academy is at your service. Contact WhatsApp 03447956085.',
    });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return res.status(200).json({
      response: `✨ *Shaheen Al Zaitoon Online Quran Academy* ✨\n📖 1-on-1 Quran Nazra, Tajweed & Hifz Classes\n✅ 3-Day Free Trial\n✅ Certified Qaris & Qarias from Rawalpindi\n📲 WhatsApp: 03447956085`,
    });
  }
}
