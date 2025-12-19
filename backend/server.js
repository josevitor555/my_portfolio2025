// Import express
import express from 'express';

// Import axios
import axios from 'axios';

// Import env for enviroment variables
import dotenv from 'dotenv';

// Import GoogleGenerativeAI
import { GoogleGenerativeAI } from '@google/generative-ai';

// Import chat history
import chatHistory from './chatHistory.js';

// Import cors
import cors from 'cors';

// Import connectMongo function
import connectMongo from './connectMongo/connect.js';

// Import auth routes
import authRoutes from './routes/authRoutes.js';

// Create app express
const app = express();

// Configure cors for connection from backend to frontend
app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://my-portfolio2025-rx2d.onrender.com', // Production frontend
    'https://my-portfolio2025-backend.onrender.com' // Production backend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin']
}));

// Middleware to parse JSON
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// Chat route with chat history
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Add user message to chat history
    chatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemma-3-1b-it" });
    
    // Start chat session with history
    const chatSession = model.startChat({ 
      history: chatHistory,
    });
    
    // Generate content
    const result = await chatSession.sendMessage(message);
    const response = result.response;
    const text = response.text();
    
    // Add AI response to chat history
    chatHistory.push({
      role: "model",
      parts: [{ text: text }],
    });
    
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Send more detailed error information
    if (error.message && error.message.includes("API key not valid")) {
      res.status(500).json({
        error: "Invalid Google API key. Please check the API key configuration.",
        details: error.message
      });
    } else {
      res.status(500).json({
        error: "Error processing your request.",
        details: error.message
      });
    }
  }
});

// Connect to MongoDB immediately on server start
connectMongo();

// Simple route to test MongoDB connection
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Server is running and MongoDB connection established" });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to MongoDB" });
  }
});

// App port
const port = process.env.PORT || 3000;

// Initialize app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});