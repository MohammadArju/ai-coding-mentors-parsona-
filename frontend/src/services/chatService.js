// chatActions.js

import { api } from "@/constants/api";
import { API } from "@/constants/RoutesName";
import { removeChat, setChatRename, togglePinChat } from "@/redux/chatSlice";
import { toast } from "react-toastify";

export const handleShare = () => {};

export const handlePin = () => {};

export const handleDelete = async (
  chatId,
  setOpen,
  dispatch,
  mentorId,
  navigate,
  id,
) => {
  try {
    setOpen(false);

    const response = await api.delete(`${API.CHAT.DELETE_CHATE}/${chatId}`);

    toast.success(response?.data?.message || "Chat deleted successfully");
    // Redux se bhi remove karo
    dispatch(removeChat(chatId));
    if (chatId === id) {
      navigate(`/mentor/${mentorId}`);
    }
  } catch (error) {
    console.error("Delete chat error:", error);

    toast.error(error.response?.data?.message || "Failed to delete chat");
  }
};
export const pinChat = async (chatId, dispatch) => {
  try {
    const response = await api.patch(`${API.CHAT.TOGGLEPIN}/${chatId}/pin`);

    dispatch(
      togglePinChat({
        chatId: chatId,
        isPinned: response.data.isPinned,
      }),
    );

    toast.success(response.data.message);
  } catch (error) {
    console.error("Pin chat error:", error);

    toast.error(error.response?.data?.message || "Failed to Pin chat");
  }
};

export const handleRename = async (
  newChatName,
  setRenamingChatId,
  chatId,
  dispatch,
) => {
  try {
    await api.patch(`${API.CHAT.RENAMECHAT}/${chatId}/title`, {
      title: newChatName,
    });

    dispatch(setChatRename({ chatId, newChatName }));

    setRenamingChatId(null);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to Rename chat");
  }
};



