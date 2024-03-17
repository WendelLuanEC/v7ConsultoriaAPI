"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChatGPTResponse = void 0;
const openai_1 = __importDefault(require("./openai"));
async function fetchChatGPTResponse(instrucao) {
    try {
        const params = {
            messages: [{ role: 'user', content: `${instrucao}` }],
            model: 'gpt-3.5-turbo',
        };
        const chatCompletion = (await openai_1.default.chat.completions.create(params));
        const chatMessage = chatCompletion.choices[0].message;
        return chatMessage.content;
    }
    catch (error) {
        console.error("Erro ao buscar resposta do ChatGPT:", error);
        throw error;
    }
}
exports.fetchChatGPTResponse = fetchChatGPTResponse;
