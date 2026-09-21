import { API } from "@/constants/RoutesName";
import { api } from "@/constants/api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllChats, setLoading } from "@/redux/chatSlice";

const useAllChats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllChats = async () => {
      try {
        dispatch(setLoading(true));

        const response = await api.get(API.CHAT.ALLCHATS, {
          withCredentials: true,
        });

        dispatch(setAllChats(response.data.chats));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load chats"
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    getAllChats();
  }, [dispatch]);
};

export default useAllChats;