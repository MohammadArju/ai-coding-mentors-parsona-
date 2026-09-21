import express from "express";
import { allChats, chats, deleteChat, generateTitle, searchChats, sendMessage, togglePinChat, updateChatTitle } from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/chat',verifyToken,sendMessage)
router.get("/all-Chats", verifyToken, allChats);
router.post("/generate/title/:chatId", verifyToken, generateTitle);

router.get("/chats/search", verifyToken, searchChats);

router.get("/chats/:chatId", verifyToken, chats);

router.delete("/chats/:chatId", verifyToken, deleteChat);

router.patch("/chats/:chatId/pin", verifyToken, togglePinChat);

router.patch("/chats/:chatId/title", verifyToken, updateChatTitle);



export default router