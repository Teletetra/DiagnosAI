const { GoogleGenerativeAI } = require("@google/generative-ai");
const Chat = require("../models/Chat");
require("dotenv").config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatController = {
  sendMessage: async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.getResponse();
      const text = response.text();

      try {
        await Chat.create({
          userId: req.user._id,
          prompt,
          response: text,
        });
        console.log("✅ Chat history saved to MongoDB");
      } catch (dbError) {
        console.error("Error saving chat history to MongoDB:", dbError);
      }

      res.json({ response: text });
    } catch (error) {
      console.error(" Error generating content:", error);
      res.status(500).json({ error: "Failed to process your request" });
    }
  },
};

module.exports = chatController;
