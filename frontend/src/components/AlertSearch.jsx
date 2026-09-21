import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/constants/api";
import { API } from "@/constants/RoutesName";
import { MessageCircle, X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const AlertSearch = ({ setOpen, open, onChatClick, chats }) => {
  const [search, setSearch] = useState("");
  const [searchChats, setSearchChat] = useState([]);

  const topChats = chats?.slice(0, 7) || [];

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setSearchChat([]);
        return;
      }
      try {
      
        const response = await api.get(
          `${API.CHAT.SEARCHCHAT}?search=${encodeURIComponent(search)}`,
        );
        setSearchChat(response.data.chats);
      } catch (error) {
        toast.error(error.response.data.massage);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const finalResult = search.trim() ? searchChats : topChats;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-175 max-w-175  text-black dark:text-white ">
        {/* Main container */}
        <div>
          <div className="flex items-center justify-between  pb-5 ">
            {/* Search Box */}
            <div className="flex items-center gap-3 flex-1 text-black dark:text-white">
              <Search size={20} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="
        w-full
        bg-transparent
        outline-none
        border-none
        text-[16px]
        
        placeholder:text-gray-400
      "
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="
      ml-4
     
      hover:text-white
      transition
    "
            >
              ✕
            </button>
          </div>

          {/* Recent Chats */}
          <div className="">
            <h3 className="text-sm  mb-2">Recent chats</h3>

            {/* Chat List */}
            <div
              className="
                max-h-107.5
                overflow-y-auto
                pr-2
                scrollbar-thin
                scrollbar-thumb-gray-600
                scrollbar-track-transparent
              "
            >
              {finalResult.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {finalResult.map((chat) => (
                    <button
                      key={chat._id || chat.chatId}
                      onClick={() => {
                        onChatClick?.(chat);
                        setOpen(false);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-5
                        text-left
                        px-2
                        py-3
                        rounded-lg
                        dark:hover:bg-[#2a2a2a]
                        hover:bg-zinc-200
                        transition
                      "
                    >
                      {/* Chat Icon */}
                      <MessageCircle
                        size={22}
                        strokeWidth={1.8}
                        className=" shrink-0"
                      />

                      {/* Chat Title */}
                      <span
                        className="
                          text-[16px]
                          
                          truncate
                        "
                      >
                        {chat.title || "Untitled chat"}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className=" text-sm py-5">No chats found</p>
              )}
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertSearch;
