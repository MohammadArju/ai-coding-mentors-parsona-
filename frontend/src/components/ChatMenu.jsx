import { RiDeleteBinLine, RiUnpinLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { IoShareOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { MdOutlinePushPin } from "react-icons/md";

import { handleDelete, pinChat } from "@/services/chatService";
import AlertDelete from "./AlertDelete";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ChatMenu = ({ chat, setRenamingChatId }) => {
  const { mentorId, id } = useParams();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        {/* Three Dot Button */}
        <DropdownMenuTrigger
           onClick={() => setRenamingChatId(null)}
          className="outline-none"
        >
          <HiOutlineEllipsisHorizontal className="text-zinc-400 hover:text-white" />
        </DropdownMenuTrigger>

        {/* Menu */}
        <DropdownMenuContent align="end" className="flex flex-col gap-3 p-2">
          {/* Share */}
          <DropdownMenuItem className="flex gap-3">
            <IoShareOutline />
            <span>Share</span>
          </DropdownMenuItem>

          {/* Rename */}
          <DropdownMenuItem
            onClick={() => setRenamingChatId(chat.chatId)}
            className="flex gap-3"
          >
            <FaPencil />
            <span>Rename</span>
          </DropdownMenuItem>

          {/* Pin / Unpin */}
          <DropdownMenuItem
            onClick={() => pinChat(chat.chatId, dispatch)}
            className="flex gap-3"
          >
            {!chat?.isPinned ? (
              <>
                <MdOutlinePushPin />
                <span>Pin chat</span>
              </>
            ) : (
              <>
                <RiUnpinLine />
                <span>Unpin chat</span>
              </>
            )}
          </DropdownMenuItem>

          {/* Delete */}
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="flex gap-3 text-red-300"
          >
            <RiDeleteBinLine />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation */}
      <AlertDelete
        open={open}
        setOpen={setOpen}
        onConfirm={() =>
          handleDelete(chat.chatId, setOpen, dispatch, mentorId, navigate, id)
        }
      />
    </>
  );
};

export default ChatMenu;
