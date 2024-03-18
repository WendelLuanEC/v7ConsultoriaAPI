"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const express = require('express');
const { fetchChatGPTResponse } = require('./chat');
const { config } = require('dotenv');


config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.get('/', async (req, res) => {
    res.send({ response: "ola" });
});
// Criando a rota /ask
app.post("/ask", async (req, res) => {
    const answer = req.body.answer;
    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }
    try {
        const chatResponse = await fetchChatGPTResponse(answer);
        // Retorna a resposta para o usuário
        res.send({ chatResponse });
    }
    catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    }
});
app.get('/get', async (req, res) => {
    requestPocketbase();
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
