import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  processingChat: false,
  allChats: [],
  loading: false,
  firstChat: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProcessingChat: (state, action) => {
      state.processingChat = action.payload;
    },

    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    addOrUpdateChat: (state, action) => {
      const newChat = action.payload;

      const index = state.allChats.findIndex(
        (chat) => chat.chatId === newChat.chatId,
      );

      if (index !== -1) {
        state.allChats[index] = newChat;
      } else {
        state.allChats.unshift(newChat);
      }
    },
    togglePinChat: (state, action) => {
      const { chatId, isPinned } = action.payload;
      const chat = state.allChats.find(
        (chat) => String(chat.chatId) === String(chatId),
      );
      if (chat) {
        chat.isPinned = isPinned;
      }
    },
    setFirstChat: (state, action) => {
      state.firstChat = action.payload;
    },
    removeChat: (state, action) => {
      state.allChats = state.allChats.filter(
        (chat) => chat.chatId !== action.payload,
      );
    },
    setChatRename: (state, action) => {
      const { newChatName, chatId } = action.payload;
      const chat = state.allChats.find(
        (chat) => String(chat.chatId) === String(chatId),
      );
      
      if (chat) {
        chat.title = newChatName;
      }
    },
  },
});

// export const  setProcessingChat = chatSlice.actions.setProcessingChat
export const {
  setProcessingChat,
  setAllChats,
  setLoading,
  addOrUpdateChat,
  setFirstChat,
  removeChat,
  togglePinChat,
  setChatRename,
} = chatSlice.actions;
export default chatSlice.reducer;
