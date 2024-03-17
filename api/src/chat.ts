import openai from './openai';

interface Params {
    messages: { role: string; content: string }[];
    model: string;
}

interface ChatCompletion {
    content: string;
}

interface ChatResponse {
    choices: { message: ChatCompletion }[];
}

export async function fetchChatGPTResponse(instrucao: string): Promise<string> {
    try {
        const params: Params = {
            messages: [{ role: 'user', content: `${instrucao}` }],
            model: 'gpt-3.5-turbo',
        };
        const chatCompletion: ChatResponse = (await openai.chat.completions.create(params as any)) as ChatResponse;
        const chatMessage: ChatCompletion = chatCompletion.choices[0].message;

        return chatMessage.content;
    } catch (error) {
        console.error("Erro ao buscar resposta do ChatGPT:", error);
        throw error;
    }
}
