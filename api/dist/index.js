"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { fetchChatGPTResponse } = require('./chat');
const gemini_1 = require("./gemini");
const { config } = require('dotenv');
const cors = require('cors');
config();
const app = express();
const PORT = process.env.PORT || 8090;
app.use(express.json());
app.use(cors());
app.get('/', async (req, res) => {
    res.send({ response: "ola" });
});
// Criando a rota /ask
app.post("/ask", async (req, res) => {
    const answer = req.body.answer;
    const frontend_secret = req.body.frontend_secret;
    console.log("Subiu");
    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }
    // if(frontend_secret === process.env.FRONTEND_SECRET){
    try {
        const chatResponse = await fetchChatGPTResponse(answer);
        // Retorna a resposta para o usuário
        res.send({ chatResponse });
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    } //}else{
    // res.status(500). send({error: "Requisição não autenticada."});
    // }
});
app.post("/askgemini", async (req, res) => {
    const answer = req.body.answer;
    const frontend_secret = req.body.frontend_secret;
    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }
    //if(frontend_secret === process.env.FRONTEND_SECRET){
    try {
        const geminiResponse = await (0, gemini_1.fetchGeminiResponse)(answer);
        // Retorna a resposta para o usuário
        res.send({ geminiResponse });
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    } //}else{
    //res.status(500). send({error: "Requisição não autenticada."});
    //}
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
