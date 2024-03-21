const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCgIbrifr7ybZVqIIvAP-pQ9ZPJ8MyOAxE");

export async function fetchGeminiResponse(question: string) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = `${question}`
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text(); // Await here as well to get the text
    return text;
    //console.log(text);
  }

