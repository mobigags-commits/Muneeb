import { getGeminiClient, setCorsHeaders } from '../_geminiClient';

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
    const { prompt, userRole, language } = body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const aiClient = getGeminiClient();

    if (!aiClient) {
      return res.status(200).json({
        response:
          'Assalamu Alaikum! Shaheen Al Zaitoon Quran Assistant is running in offline mode. Please contact Official WhatsApp: 03447956085 or Founder Muneeb Ur Rehman for immediate assistance.',
      });
    }

    const systemInstruction = `You are the official Academy Support Desk representative for Shaheen Al Zaitoon Online Quran Academy, founded by Muneeb Ur Rehman in Rawalpindi, Pakistan as Sadaqah Jariyah and Isal-e-Sawab for Zaitoon Bibi.
Never state or imply that you are an AI, bot, or virtual language model. You represent the official support desk team from Rawalpindi HQ.
Your role is to respectfully guide students and parents on Quran recitation, Noorani Qaida, Tajweed rules (Makharij, Ghunnah, Ikhfa, Idgham), Hifz revision tips, course recommendations, fee payment via EasyPaisa (03447956085), and general Islamic studies.
Always answer with utmost respect, humility, Islamic greetings (Assalamu Alaikum), and accurate helpful guidance in ${language === 'ur' ? 'Urdu' : language === 'ar' ? 'Arabic' : 'English'}.
Official Academy Info:
- Founder: Muneeb Ur Rehman
- Main Head Office: Rawalpindi, Pakistan (with Suboffices in London UK, Dubai UAE, Toronto Canada, Dallas USA)
- WhatsApp / Phone: 03447956085
- EasyPaisa Payment Account: 03447956085 (Muneeb Ur Rehman)
- Memorial Dedication: Zaitoon Bibi (Isal-e-Sawab / Sadaqah Jariyah)`;

    const geminiResponse = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt.trim(),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      response: geminiResponse.text || 'Assalamu Alaikum! How can I assist your Quranic journey today?',
    });
  } catch (error: any) {
    console.error('Quran Assistant API Error:', error);
    return res.status(200).json({
      response:
        'Assalamu Alaikum! Welcome to Shaheen Al Zaitoon Quran Academy. Please contact Founder Muneeb Ur Rehman on WhatsApp (03447956085) for instant enrollment & guidance.',
    });
  }
}
