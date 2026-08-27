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
    const { age, level, goal, gender } = body;

    const aiClient = getGeminiClient();

    if (!aiClient) {
      return res.status(200).json({
        recommendation: `Recommended: Noorani Qaida & Tajweed Basics. Ideal for ${age || 'all'} ages with personalized 1-on-1 classes at Shaheen Al Zaitoon Academy. Contact 03447956085 to start your 3-day free trial.`,
      });
    }

    const prompt = `Student Profile: Age: ${age || 'Not specified'}, Current Level: ${level || 'Beginner'}, Goal: ${goal || 'Learn Quran with Tajweed'}, Gender: ${gender || 'Any'}. Recommend the best course from Shaheen Al Zaitoon Online Quran Academy and explain why in 3 brief, encouraging sentences.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert Islamic academic advisor for Shaheen Al Zaitoon Quran Academy in Rawalpindi, Pakistan.',
      },
    });

    return res.status(200).json({
      recommendation: response.text || 'We recommend starting with our 3-Day Free Trial Noorani Qaida & Tajweed Foundations course.',
    });
  } catch (error) {
    console.error('Course Recommender API Error:', error);
    return res.status(200).json({
      recommendation: 'We recommend starting with our 3-Day Free Trial Noorani Qaida & Tajweed Foundations course. Contact WhatsApp: 03447956085.',
    });
  }
}
