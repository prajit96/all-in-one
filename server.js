import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateContent } from 'gemini-js'; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to All-in-One Website');
});

// Generate Shayari, Quotes, and Stories
app.post('/generate', async (req, res) => {
  const { type, language, category } = req.body;

  try {
    const prompt = `Generate a ${type} in ${language} language for this ${category} category.`;
    const content = await generateContent(process.env.GEMINI_API_KEY, prompt);
    res.status(200).send({ msg: content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send({ error: 'Failed to generate content' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is live at Port ${PORT}`);
});
