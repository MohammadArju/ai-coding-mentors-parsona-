import React, { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Mic } from "lucide-react";

import { BeatLoader } from "react-spinners";

// chat gpt format
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";
import { useNavigate, useParams } from "react-router-dom";
import { sendMessage } from "@/services/aiService.js";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/constants/api";
import { toast } from "react-toastify";
import { API } from "@/constants/RoutesName";
import useAllChats from "@/hooks/chat-hook";
import { useDispatch } from "react-redux";
import {
  addOrUpdateChat,
  setProcessingChat,
  setFirstChat,
} from "@/redux/chatSlice";

export default function Temporary() {
  // const [persona, setPersona] = useState("hitesh");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const { mentorId, id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useAllChats();
  useEffect(() => {
    if (!id) {
      setChat([]);
      setMessage("");
      return;
    }
    const isNewChat = sessionStorage.getItem("newChat");
    if (isNewChat) {
      sessionStorage.removeItem("newChat");
      return;
    }
    const fetchChat = async () => {
      try {
        const response = await api.get(`${API.CHAT.CHATS}/${id}`);
        setChat(response.data.chat.messages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchChat();
  }, [id]);

  useEffect(() => {
    // auto-scroll to bottom when chat or loading changes
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat, loading]);

  // const {firstChat} = useSelector((state) => state.chat)

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const currentChatId = id || uuidv4();

    const userMessage = message.trim();

    const titleMessage = userMessage.split(/\s+/).slice(0, 5).join(" ");
  
    try {
      // New Chat

      if (!id) {
        dispatch(setFirstChat(titleMessage));
        sessionStorage.setItem("newChat", "true");
        navigate(`/mentor/${mentorId}/${currentChatId}`, {
          replace: true,
        });

        dispatch(setProcessingChat(true));
      }

      // Send Message

      await sendMessage({
        message: userMessage,
        setMessage,
        setChat,
        setLoading,
        mentorId,
        loading,
        chatId: currentChatId,
      });

      // Generate Title

      if (!id) {
        try {
          const response = await api.post(
            `${API.CHAT.GENERATE_TITLE}/${currentChatId}`,
            {
              userMessage: titleMessage,
            },
          );

          if (response.data?.chat) {
            // Temporary first chat data clear
            dispatch(setFirstChat(""));

            // Redux sidebar update
            dispatch(addOrUpdateChat(response.data.chat));
          }
        } catch (error) {
          console.error("Title generation failed:", error);

          // Error hone par bhi temporary data clear
          dispatch(setFirstChat(""));
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      dispatch(setProcessingChat(false));
    }
  };
  const handleKeyDown = (e) => {
    // Allow Shift+Enter for newline, Enter to send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      handleSend();
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-linear-to-br from-[#0e0f1a] via-[#121528] to-[#0a0b13] dark:from-[#0a0a0a] dark:via-[#0b0d14] dark:to-[#0a0a0a] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      <main className="h-full w-full flex flex-col">
        {/* Chat Area */}
        <div className="relative mt-6 flex-1 min-h-0 overflow-hidden">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 backdrop-blur-xl border border-white/10 shadow-[0_8px_60px_-12px_rgba(0,0,0,0.45)]" />

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto scroll-smooth px-3 sm:px-6 py-6 space-y-4"
            aria-live="polite"
          >
            <div className="mx-auto w-full max-w-3xl">
              <AnimatePresence initial={false}>
                {chat.map((msg) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                      mass: 0.6,
                    }}
                    className={`mb-4 flex w-full ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.role === "user" ? "max-w-[85%]" : "max-w-full"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 ${
                          msg.role === "user"
                            ? "rounded-2xl border border-white/10 bg-linear-to-br from-indigo-600/80 to-fuchsia-600/80 text-white shadow-lg"
                            : "text-slate-100"
                        }`}
                      >
                        {msg.role === "bot" && (
                          <div className="mb-2 flex items-center gap-2 opacity-80">
                            <Bot className="h-4 w-4" />
                            <span className="text-xs">Nova</span>
                          </div>
                        )}

                        {!msg.content ? (
                          <BeatLoader />
                        ) : (
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeHighlight]}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 p-2 sm:p-2.5">
              <button className="hidden sm:grid h-11 w-11 place-content-center rounded-xl bg-white/10 border border-white/10">
                <Mic className="h-5 w-5 text-slate-100" />
              </button>

              <textarea
                rows={1}
                placeholder="Message Nova..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent resize-none outline-none text-slate-100 placeholder:text-slate-300 px-3 py-3"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleSend}
                disabled={loading}
                className="relative rounded-xl px-4 py-2.5 text-sm font-medium text-white"
              >
                <span className="absolute inset-0 rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600" />

                <span className="relative flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send
                </span>
              </motion.button>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-slate-300/70">
            AI may display inaccuracies. Verify important info.
          </p>
        </div>
      </main>
    </div>
  );
}
