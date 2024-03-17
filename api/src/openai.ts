import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string // A chave da API é uma string
});

export default openai;
