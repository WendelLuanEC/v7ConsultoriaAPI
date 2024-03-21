const express = require('express');
const { fetchChatGPTResponse } = require('./chat');
import { fetchGeminiResponse } from "./gemini";
const { config } = require('dotenv');
const cors = require('cors')
config();

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(cors())
app.get('/', async (req : any, res: any) => {
    res.send({ response: "ola" });
});

// Criando a rota /ask
app.post("/ask", async (req: any, res: any) => {
    const answer: string = req.body.answer;

    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }
    if(process.env.FRONTEND_SECRET === '33445566778112'){
    try {
        const chatResponse = await fetchChatGPTResponse(answer);
        // Retorna a resposta para o usuário
        res.send({ chatResponse });
    } catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    }}
});

app.post("/askgemini", async (req: any, res: any) => {
    const answer: string = req.body.answer;
    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }
    if(process.env.FRONTEND_SECRET === '33445566778112'){
    try {
        const geminiResponse = await fetchGeminiResponse(answer);
        // Retorna a resposta para o usuário
        res.send({ geminiResponse });
    } catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    }}
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
