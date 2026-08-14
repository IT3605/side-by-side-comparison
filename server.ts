import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client securely on the server
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Property Investment Copilot API Endpoint
  app.post('/api/ai/property-analysis', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'Gemini API key is missing. Please configure GEMINI_API_KEY in environment secrets.',
        });
      }

      const { userPrompt, propertyData, budget, district, propertyType, intent } = req.body;

      const systemInstruction = `You are a top-tier Singapore Property Investment Analyst & Chartered Financial Surveyor. 
Your job is to analyze Singapore property opportunities (HDB, Condos, Landed) for Singaporeans and property investors.
Focus heavily on real metrics:
1. Valuation (Undervalued / Fair / Overvalued) relative to bank fair values & PSF trends.
2. Rental Yield % & Cashflow spread vs MAS mortgage rates (assuming 75% LTV, ~3.2% interest rate).
3. District Catalysts (URA Master Plan, Cross Island Line, TEL MRT, Jurong Lake District, Greater Southern Waterfront, Paya Lebar Airbase).
4. Proximity to top Primary Schools (1km / 2km GEP / Phase 2B/2C rule).
5. Leasehold decay risk (Bala's Curve for 99-year leasehold vs Freehold).
6. Clear, actionable verdict: "Strong Buy Bargain", "Fair Investment", "Neutral Watchlist", or "Overpriced / High Risk".

Provide structured, clear, and professional responses formatted in markdown with bullet points and key financial figures highlighted in bold.`;

      let prompt = `User Query: ${userPrompt || 'Provide an investment analysis based on current Singapore property metrics.'}\n`;
      if (budget) prompt += `Budget: S$${Number(budget).toLocaleString()}\n`;
      if (district) prompt += `Target District: District ${district}\n`;
      if (propertyType) prompt += `Property Type: ${propertyType}\n`;
      if (intent) prompt += `Intent: ${intent}\n`;
      if (propertyData) prompt += `Property Details: ${JSON.stringify(propertyData)}\n`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reportText = response.text || 'Unable to generate analysis at this time.';
      res.json({ report: reportText });
    } catch (error: any) {
      console.error('Error generating property analysis:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI property analysis.' });
    }
  });

  // Setup Vite middleware in dev or serve static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
