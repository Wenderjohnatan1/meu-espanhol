import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!ai });
});

// 1. AI Chat Endpoint with South American Dialect & Grammar correction
app.post("/api/chat", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured. Please set GEMINI_API_KEY in Secrets." });
  }

  const { messages, country, characterName } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  const countryDialects: Record<string, string> = {
    argentina: "Argentina (Sotaque Rioplatense). Use voseo (vos tenés, querés, andás, che, boludo, pibe, bondi, re loco, etc.). Fale como um portenho genuíno, bem informal.",
    colombia: "Colômbia. Use expressões como 'parce', 'bacano', 'chévere', 'vaina', 'qué mais', 'parcero', 'rumbear', etc. Tom amigável, acolhedor e 'buena onda'.",
    chile: "Chile. Use gírias como 'cachai', 'weón' (com moderação amigável), 'po', 'fome', 'al tiro', 'pololo', etc. Sotaque rápido e informal chileno.",
    peru: "Peru. Use expressões como 'pata', 'choche', 'luca', 'chela' (cerveja), 'asado' (bravo), 'jato' (casa), 'ya' (ok), etc."
  };

  const dialectInfo = countryDialects[country?.toLowerCase()] || countryDialects.argentina;

  const systemInstruction = `Você é um amigo nativo da região de ${country || "Argentina"} chamado ${characterName || "Santi"}.
Você fala de forma EXTREMAMENTE natural, usando gírias e sotaque locais reais que as pessoas de lá usam na rua e no dia a dia.
O seu interlocutor é um brasileiro aprendendo espanhol prático. Não fale sobre regras gramaticais complexas. Fale como se estivesse conversando no WhatsApp ou em um café.
Mantenha as respostas curtas (máximo 2 a 3 frases) para parecer um chat real de celular.

Você DEVE analisar a última mensagem enviada pelo usuário (que está em espanhol ou tentando estar).
Se o usuário cometeu algum erro gramatical, de concordância, ou se expressou de forma que soe muito artificial/portunhol, você deve apontar isso de forma super amigável no campo de correções.

Você deve responder rigorosamente no seguinte formato JSON:
{
  "reply": "Sua resposta amigável em espanhol usando gírias locais",
  "corrections": [
    {
      "original": "Trecho incorreto que o usuário enviou",
      "corrected": "Como um nativo diria de forma natural",
      "explanation": "Explicação simples e simpática em português de por que corrigir ou como soa mais natural"
    }
  ],
  "localSlangTip": "Uma explicação curta em português de uma gíria ou expressão local que você usou na sua resposta."
}

Mantenha a resposta JSON válida e bem formatada. Não inclua blocos de código markdown adicionais (como \`\`\`json), envie apenas a string JSON pura.`;

  try {
    // Convert message history to Gemini contents structure
    // We only take the last 8 messages to keep context short and fast
    const recentMessages = messages.slice(-8).map(msg => ({
      role: msg.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: recentMessages,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const textResponse = response.text || "{}";
    try {
      const parsed = JSON.parse(textResponse.trim());
      res.json(parsed);
    } catch (parseError) {
      console.error("JSON parsing error from Gemini response:", textResponse, parseError);
      // Fallback response structure
      res.json({
        reply: textResponse,
        corrections: [],
        localSlangTip: "¡A practicar! Fala comigo sobre o seu dia."
      });
    }
  } catch (error: any) {
    console.error("Error generating chat response:", error);
    res.status(500).json({ error: error.message || "Erro ao conectar com o serviço de IA." });
  }
});

// 2. Generate Interactive Story in South American Spanish
app.post("/api/generate-story", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  const { country, topic } = req.body;

  const prompt = `Crie uma história interativa super curta baseada no sotaque e cotidiano de ${country || "Argentina"}.
O tema/cenário deve ser: ${topic || "no café/restaurante"}.
A história deve usar gírias cotidianas de lá (como 'che, boludo' na Argentina, 'bacano, parce' na Colômbia, etc.).
A história precisa ser engajadora, dividida em 3 pequenos parágrafos em espanhol.

Você DEVE retornar a resposta EXCLUSIVAMENTE em formato JSON com o seguinte esquema:
{
  "title": "Título da história em espanhol",
  "location": "Cidade e País onde se passa",
  "paragraphs": [
    "Parágrafo 1 em espanhol coloquial",
    "Parágrafo 2 em espanhol coloquial",
    "Parágrafo 3 em espanhol coloquial"
  ],
  "translations": [
    "Tradução literal ou contextualizada em português do Parágrafo 1",
    "Tradução literal ou contextualizada em português do Parágrafo 2",
    "Tradução literal ou contextualizada em português do Parágrafo 3"
  ],
  "slangGlossary": [
    {
      "word": "A gíria ou palavra local usada",
      "meaning": "O que significa em português brasileiro",
      "example": "Um exemplo curto de frase cotidiana com essa palavra"
    }
  ],
  "quiz": {
    "question": "Uma pergunta simples sobre a história em português ou espanhol bem simples",
    "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "correctIndex": 0,
    "explanation": "Explicação em português de por que essa é a resposta certa baseada na história"
  }
}

Retorne apenas o JSON puro, sem formatação markdown de blocos de código.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const textResponse = response.text || "{}";
    try {
      const parsed = JSON.parse(textResponse.trim());
      res.json(parsed);
    } catch (parseError) {
      console.error("JSON parsing error from story generation:", textResponse, parseError);
      res.status(500).json({ error: "Erro ao parsear a história gerada pela IA." });
    }
  } catch (error: any) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: error.message || "Erro ao gerar história." });
  }
});

// Vite middleware for development or Static Server for production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
