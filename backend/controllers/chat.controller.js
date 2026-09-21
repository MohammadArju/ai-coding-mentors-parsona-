import { SYSTEMS } from "../utils/sytemMessage.js";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import OpenAI from "openai";
import Chat from "../Models/chat.model.js";

const client = new OpenAI();

export const sendMessage = async (req, res) => {
  try {
    const { userMessage, persona, chatId } = req.body;
    console.log(userMessage, persona, chatId);
    if (!userMessage?.trim() || !persona || !chatId?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const cleanChatId = chatId.trim();
    const cleanMessage = userMessage.trim();

    // --------------------------------
    // Find Chat
    // --------------------------------
    let chat = await Chat.findOne({
      chatId: cleanChatId,
      user: req.user.id,
    });

    // --------------------------------
    // New Chat
    // --------------------------------
    if (!chat) {
      chat = await Chat.create({
        user: req.user.id,
        title: cleanMessage.substring(0, 30),
        chatId: cleanChatId,
        messages: [],
      });
    }

    // --------------------------------
    // User Message
    // --------------------------------
    chat.messages.push({
      role: "user",
      content: cleanMessage,
    });

    await chat.save();

    // --------------------------------
    // OpenAI Streaming
    // --------------------------------
    let botResponse = "";

    const stream = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: cleanMessage,
        },
      ],
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    // --------------------------------
    // Stream AI Response
    // --------------------------------
    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        botResponse += event.delta;

        res.write(event.delta);
      }
    }

    // --------------------------------
    // Save AI Response
    // --------------------------------
    chat.messages.push({
      role: "assistant",
      content: botResponse,
    });

    await chat.save();

    res.end();
  } catch (error) {
    console.error("Error sending message:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    res.end();
  }
};

export const allChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ user: userId })
      .select("_id title createdAt updatedAt chatId isPinned")
      .sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      count: chats.length,
      chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const chats = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    console.error("Error fetching chat:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const generateTitle = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userMessage } = req.body;
    console.log(chatId,userMessage)

    if (!chatId?.trim() || !userMessage?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and user message are required",
      });
    }

    const cleanChatId = chatId.trim();
    const cleanMessage = userMessage.trim();

    // --------------------------------
    // Find Existing Chat
    // --------------------------------
    const chat = await Chat.findOne({
      chatId: cleanChatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // --------------------------------
    // Generate AI Title
    // --------------------------------
    const response = await client.responses.create({
      model: "gpt-4.1-mini",

      input: [
        {
          role: "system",
          content: `You are a chat title generator.

Create a short and meaningful title for the conversation.

Rules:
- Return only the title.
- 3-6 words only.
- No quotes, emojis, or explanations.
- Keep it clear and relevant.
- Use the user's language.

Example:
User message: "How can I learn React in 30 days?"
Title: React Learning Roadmap`,
        },
        {
          role: "user",
          content: cleanMessage,
        },
      ],
    });

    const title = response.output_text.trim();

    // --------------------------------
    // Update Chat Title
    // --------------------------------
    chat.title = title;

    const updatedChat = await chat.save();

    // --------------------------------
    // Response
    // --------------------------------
    return res.status(200).json({
      success: true,
      message: "Chat title generated successfully",

      chat: {
        _id: updatedChat._id,
        chatId: updatedChat.chatId,
        title: updatedChat.title,
        messages: updatedChat.messages,
        createdAt: updatedChat.createdAt,
        updatedAt: updatedChat.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error generating chat title:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    const chat = await Chat.findOneAndDelete({
      chatId: chatId.trim(),
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      chatId: chat.chatId,
    });
  } catch (error) {
    console.error("Error deleting chat:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const togglePinChat = async (req, res) => {
  try {
    let { chatId } = req.params;
    if (!chatId) {
      return res
        .status(400)
        .json({ message: "Please select chat", success: false });
    }
    const chat = await Chat.findOne({
      chatId: chatId.trim(),
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
        success: false,
      });
    }

    chat.isPinned = !chat.isPinned;

    await chat.save();
    return res.status(200).json({
      success: true,
      message: chat.isPinned ? "Chat pinned" : "Chat unpinned",
      isPinned: chat.isPinned,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateChatTitle = async (req, res) => {
  try {
    let { chatId } = req.params;
    const { title } = req.body;
    const chat = await Chat.findOne({
      chatId: chatId.trim(),
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
        success: false,
      });
    }
    chat.title = title;
    await chat.save();
    return res
      .status(201)
      .json({ success: true, message: "Chat update successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const searchChats = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    const relevantChats = await Chat.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: search.trim(),
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 1,
            },
          },
        },
      },
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $limit: 10,
      },
    ]);
    if (relevantChats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "There is no Chat found",
      });
    }

    return res.status(200).json({
      success: true,
      chats: relevantChats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
