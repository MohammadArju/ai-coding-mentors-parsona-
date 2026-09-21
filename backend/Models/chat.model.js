import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonaUser",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },
    chatId: {
      type: String,
      required: true,
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },

    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },

        content: {
          type: String,
          required: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
