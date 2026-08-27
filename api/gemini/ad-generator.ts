import { getGeminiClient, setCorsHeaders } from '../_geminiClient';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const defaultFallback = {
    headline: '🔥 Transform Your Reach with Shaheen Al Zaitoon Network',
    description: 'Connect with thousands of verified students, families, and buyers across Pakistan, UK, UAE & North America. 100% verified engagement.',
    ctaText: 'Get Started Today',
    targetAudience: {
      locations: ['Pakistan', 'UK', 'UAE', 'USA'],
      ageRange: '20-55',
      interests: ['Quran Education', 'Halal Lifestyle', 'Islamic Community'],
      demographics: 'Parents, Students & Working Professionals',
    },
    aiOptimizations: [
      'Use high-contrast Islamic gold and emerald color themes',
      'Include official WhatsApp 03447956085 in your primary call to action',
      'Schedule postings during peak 7 PM - 10 PM PKT window',
    ],
  };

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { businessOrProduct, targetAudience, objective, platform, tone } = body;

    const aiClient = getGeminiClient();

    if (!aiClient) {
      return res.status(200).json(defaultFallback);
    }

    const prompt = `You are an AI Digital Advertising Strategist for multi-platform social media ads (Facebook, Instagram, WhatsApp, Web Banners, Google Ads).
Business/Product Name: "${businessOrProduct || 'Shaheen Al Zaitoon Ecosystem'}"
Target Audience Goal: "${targetAudience || 'General Audience'}"
Campaign Objective: "${objective || 'Lead Generation & Sales'}"
Target Platform: "${platform || 'Multi-Channel Social & Web'}"
Tone of Voice: "${tone || 'Professional & Engaging'}"

Generate a JSON object with:
- "headline": Punchy, high-converting ad headline (under 12 words)
- "description": High-converting ad copy description / caption (2-4 paragraphs with emojis & clear benefits)
- "ctaText": Powerful call-to-action button text
- "targetAudience": Object containing:
  - "locations": array of top 4 targeted cities/countries
  - "ageRange": optimal age range string (e.g. "20-45")
  - "interests": array of 4 key interest tags
  - "demographics": string describing target customer profile
- "aiOptimizations": array of 3 actionable AI growth suggestions to double CTR and conversions.

Respond ONLY with valid JSON.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('AI Ad Generator Error:', error);
    return res.status(200).json(defaultFallback);
  }
}
