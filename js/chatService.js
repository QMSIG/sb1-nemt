import { OPENAI_API_KEY, MODEL } from './config.js';

let conversationHistory = [{
    role: "system",
    content: "You are a helpful assistant specializing in providing information about Master's programs in German universities. Only answer questions related to studying in Germany, university information, admission requirements, visa processes, and student life in Germany. For any other topics, politely redirect the conversation back to German education-related matters."
}];

export async function sendToChatGPT(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [...conversationHistory, { role: "user", content: message }],
                max_tokens: 500,
                temperature: 0.7,
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const botResponse = data.choices[0].message.content;
            conversationHistory.push({ role: "user", content: message });
            conversationHistory.push({ role: "assistant", content: botResponse });
            return botResponse;
        }
        throw new Error('No response from ChatGPT');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}