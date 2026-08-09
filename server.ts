import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client
  let aiClient: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Health Endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', academy: 'Shaheen Al Zaitoon Online Quran Academy' });
  });

  // AI Quran Learning Assistant & Tajweed Helper
  app.post('/api/gemini/quran-assistant', async (req, res) => {
    try {
      const { prompt, userRole, language } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!aiClient) {
        return res.status(500).json({
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
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ response: geminiResponse.text || 'Assalamu Alaikum! How can I assist your Quranic journey today?' });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: 'Failed to generate response',
        details: error?.message || 'Server error',
      });
    }
  });

  // AI Course Recommender Route
  app.post('/api/gemini/course-recommender', async (req, res) => {
    try {
      const { age, level, goal, gender } = req.body;

      if (!aiClient) {
        return res.json({
          recommendedCourse: 'Noorani Qaida & Tajweed Basics',
          reason: 'Recommended for all beginners starting their Quranic journey with Shaheen Al Zaitoon Academy.',
        });
      }

      const prompt = `Student Profile: Age: ${age}, Current Level: ${level}, Goal: ${goal}, Gender: ${gender}. Recommend the best course from Shaheen Al Zaitoon Online Quran Academy and explain why in 3 brief, encouraging sentences.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert Islamic academic advisor for Shaheen Al Zaitoon Quran Academy.',
        },
      });

      res.json({ recommendation: response.text });
    } catch (error) {
      res.status(500).json({ error: 'Failed to recommend course' });
    }
  });

  // AI Ad & Copy Generator Route
  app.post('/api/gemini/ad-generator', async (req, res) => {
    try {
      const { businessOrProduct, targetAudience, objective, platform, tone } = req.body;

      if (!aiClient) {
        return res.json({
          headline: `🔥 Promote ${businessOrProduct || 'Your Business'} Today!`,
          description: `Reach thousands of high-converting customers across Pakistan & Overseas. Join Shaheen Al Zaitoon network now for maximum growth!`,
          ctaText: 'Contact Us Now',
          targetAudience: {
            locations: ['Pakistan', 'UK', 'UAE', 'USA'],
            ageRange: '22-55',
            interests: ['Islamic Products', 'Quran Education', 'Halal Shopping'],
            demographics: 'Family Decision Makers & Professionals',
          },
          aiOptimizations: [
            'Add social proof or verified customer review to increase trust',
            'Post during peak hours (8 PM to 10 PM PKT)',
          ],
        });
      }

      const prompt = `You are a world-class AI Digital Advertising Strategist and Copywriter specializing in multi-platform social media ads (Facebook, Instagram, WhatsApp, Web Banners, Google Ads).
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
      res.json(parsed);
    } catch (error: any) {
      console.error('AI Ad Generator Error:', error);
      res.status(500).json({
        error: 'Failed to generate ad copy',
        details: error?.message || 'AI service unavailable',
      });
    }
  });

  // Vite Middleware handling frontend app
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shaheen Al Zaitoon Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
