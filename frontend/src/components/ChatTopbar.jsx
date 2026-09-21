import { FaRobot } from "react-icons/fa6";
import { MdOutlinePushPin, MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiUnpinLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleDelete, pinChat } from "@/services/chatService";
import AlertDelete from "./AlertDelete";
import { useState } from "react";
import { API } from "@/constants/RoutesName";
import { useTheme } from "@/components/theme-provider";
const ChatTopbar = () => {
  const [open, setOpen] = useState(false);
  const { mentorId, id } = useParams();
  const dispatch = useDispatch();
  const { allChats } = useSelector((state) => state?.chat);
  const toggleChat = allChats.find((chat) => chat?.chatId === id);
  const navigate = useNavigate();

  const {theme, setTheme} = useTheme();

  return (
    <>
      <div className="flex justify-between w-full max-w-6xl mx-auto my-3 ">
        <div className="flex items-center gap-3 ">
          <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 via-violet-600 to-fuchsia-600 shadow-lg">
            <FaRobot className=" text-white" />
          </div>
          <div>
            <div>
              <h1 className="font-bold">Ai Coding Mentors Parsona</h1>
            </div>
            <p className="text-gray-500  text-xs ">
              Learn coding with india`s top educators
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          {!id ? (
            <Tooltip>
              <TooltipTrigger>
                <MdOutlineWatchLater
                  onClick={() => navigate(`/mentor/${mentorId}${API.CHAT.TEMPORARY_CHAT}`)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xm font-sans">temporary chat</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <HiOutlineAdjustmentsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="flex items-center justify-between">
                    <span>Theme</span>

                    <div className="flex items-center ">
                      <button
                        onClick={() => setTheme("light")}
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-red-400"
                      >
                        <IoIosSunny className="text-yellow-500 text-lg" />
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-red-300"
                      >
                        <IoIosMoon className="text-lg" />
                      </button>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IoArchiveOutline />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}
                    className="text-red-500 focus:text-red-500"
                  >
                    <RiDeleteBin6Line className="text-red-500" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => pinChat(chatId, dispatch)}
                    className="flex gap-3"
                  >
                    {!toggleChat?.isPinned ? (
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
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <AlertDelete
        open={open}
        setOpen={setOpen}
        onConfirm={() =>
          handleDelete(
            toggleChat?.chatId,
            setOpen,
            dispatch,
            mentorId,
            navigate,
            id,
          )
        }
      />
    </>
  );
};

export default ChatTopbar;
