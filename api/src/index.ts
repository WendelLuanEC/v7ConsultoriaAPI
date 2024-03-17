const express = require('express');
const { fetchChatGPTResponse } = require('./chat');
const { config } = require('dotenv');
const { requestPocketbase } = require('./pocketbase');

config();

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());

app.get('/', async (req : any, res: any) => {
    res.send({ response: "ola" });
});

// Criando a rota /ask
app.post("/ask", async (req: any, res: any) => {
    const answer: string = req.body.answer;

    if (!answer) {
        return res.status(400).send({ error: "Pergunta não fornecida." });
    }

    try {
        const chatResponse = await fetchChatGPTResponse(answer);
        // Retorna a resposta para o usuário
        res.send({ chatResponse });
    } catch (error) {
        res.status(500).send({ error: "Erro ao processar sua pergunta." });
    }
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
