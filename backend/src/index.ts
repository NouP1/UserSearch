import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let currentTimeout: NodeJS.Timeout | null = null;

app.post('/search', async (req: Request, res: Response) => {
  const { email, number } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (number && !/^\d{6}$/.test(number)) {
    return res.status(400).json({ error: 'Invalid number' });
  }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }

  currentTimeout = setTimeout(async () => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
    const filteredData = data.filter((user: { email: string; number: string }) => {
      return user.email.includes(email) && (!number || user.number === number);
    });
    res.json(filteredData);
  }, 5000);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port} ...`);
});