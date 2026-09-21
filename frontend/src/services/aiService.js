import { API } from "../constants/RoutesName";
import { v4 as uuidv4 } from "uuid";
const makeId = () => uuidv4();

export const sendMessage = async ({
  message,
  setMessage,
  setChat,
  setLoading,
  mentorId,
  loading,
  chatId,
}) => {
  const trimmed = message.trim();
console.log(message)
  if (!trimmed || loading) return;

  const userMsg = {
    id: makeId(),
    role: "user",
    content: trimmed,
  };

  const botId = makeId();

  const botMsg = {
    id: botId,
    role: "bot",
    content: "",
  };

  setChat((prev) => [...prev, userMsg, botMsg]);

  setMessage("");
  setLoading(true);

  try {
    const response = await fetch(`${API.BASE_URL}/api/chat`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: trimmed,
        persona: mentorId,
        chatId,
      }),
    });
console.log(response)
    if (!response.ok) {
      throw new Error("Request Failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      setChat((prev) =>
        prev.map((msg) =>
          msg.id === botId
            ? {
                ...msg,
                content: msg.content + chunk,
              }
            : msg
        )
      );
    }
  } catch (error) {
    console.log(error);

    setChat((prev) =>
      prev.map((msg) =>
        msg.id === botId
          ? {
              ...msg,
              content: "Something went wrong!",
            }
          : msg
      )
    );
  } finally {
    setLoading(false);
  }
};