import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ChatMenu from "./ChatMenu";

import { PiPushPinSimple } from "react-icons/pi";
import { RiUnpinLine } from "react-icons/ri";

import { handleRename, pinChat } from "@/services/chatService";
const AppSidebarContent = ({
  chat,
  id,
  mentorId,
  renamingChatId,
  setRenamingChatId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newChatName, setNewChatName] = useState(chat.title);

  const isActive = String(id) === String(chat.chatId);

  const isRenaming = renamingChatId === chat.chatId;

  return (
    <>
      {isRenaming ? (
        <div className="flex w-full items-center gap-2 rounded-xl px-3 py-2 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRename(newChatName, setRenamingChatId, chat.chatId.trim(),dispatch);
            }}
          >
            <input
              autoFocus
              value={newChatName}
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setNewChatName(e.target.value);
              }}
            className="min-w-0 flex-1 bg-black/10 dark:bg-white/10 text-black dark:text-white outline-none"
            />
          </form>

          <button
            onClick={() => setRenamingChatId(null)}
            className="text-sm text-zinc-400"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div
          className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 ${
            isActive
              ? "bg-gray-200 dark:bg-white/10 text-black dark:text-white"
              : "text-black dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5"
          }`}
        >
          <button
            onClick={() => {
              navigate(`/mentor/${mentorId}/${chat.chatId}`);
              setRenamingChatId(null);
            }}
            className="min-w-0 flex-1 truncate text-left"
          >
            {chat.title}
          </button>

          <div
            className="ml-3 flex shrink-0 items-center gap-2 opacity-0 group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {!chat?.isPinned ? (
              <PiPushPinSimple
                onClick={() => pinChat(chat.chatId, dispatch)}
                className="cursor-pointer text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              />
            ) : (
              <RiUnpinLine
                onClick={() => pinChat(chat.chatId, dispatch)}
                className="cursor-pointer text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              />
            )}

            <ChatMenu chat={chat} setRenamingChatId={setRenamingChatId} />
          </div>
        </div>
      )}
    </>
  );
};

export default AppSidebarContent;
