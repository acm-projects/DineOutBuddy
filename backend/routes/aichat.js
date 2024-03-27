import express from 'express';
import { } from 'dotenv/config';
import openai from '../config/open-ai.js';
import colors from 'colors';
import fs from 'fs';

export const router = express.Router();

router.get('/aichat', async (req, res) => {
    console.log(colors.bold.green('Hello! My name is DinO, how can I help?'));
    // Reading initial chat history or config if necessary
    const chatHistory = [];
    chatHistory.push(['user', fs.readFileSync('restaurants.txt', 'utf8')]);
    chatHistory.push(['user', "You will use the given data to be a chat bot to help me find the perfect restaurant"]);

    const userInput = req.query.message;

    if (!userInput) {
        res.status(400).send('Please provide a message query parameter');
        return;
    }

    try {
        // Store messages by history
        const messages = chatHistory.map(([role, content]) => ({ role, content }));

        // Add user input
        messages.push({ role: 'user', content: userInput });

        // Call the API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });

        // Get completion text
        const completionText = completion.choices[0].message.content;

        console.log(colors.green('Bot: ') + completionText);

        // Update history with user input and bot response
        chatHistory.push(['user', userInput]);
        chatHistory.push(['assistant', completionText]);

        // Responding with the chatbot's message
        res.send({ response: completionText });
    } catch (error) {
        console.error(colors.red(error));
        res.status(500).send('Internal Server Error');
    }
});

export default router;