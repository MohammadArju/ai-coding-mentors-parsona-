import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { motion } from "framer-motion";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TiPinOutline } from "react-icons/ti";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TbSquareToggle } from "react-icons/tb";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import AppSidebarContent from "./AppSidebarContent";
import { useState } from "react";
import AlertSearch from "./AlertSearch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import MySidebarFooter from "./MySidebarFooter";
import { useTheme } from "@/components/theme-provider";
export function AppSidebar() {
  const [renamingChatId, setRenamingChatId] = useState(null);
  const [open, setOpen] = useState(false);
  const { processingChat, allChats, loading } = useSelector(
    (state) => state.chat ?? false,
  );
  const { mentorId, id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { firstChat } = useSelector((state) => state.chat);
  const { toggleSidebar } = useSidebar();
  const { theme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="border-r bg-zinc-950 text-white">
      {/* Header */}
      <SidebarHeader className="border-b border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <h1
            className={`group-data-[collapsible=icon]:hidden text-xl font-bold tracking-wide text-black dark:text-white`}
          >
            Persona<span className="text-indigo-400">.Chat</span>
          </h1>

          <button
            onClick={toggleSidebar}
            className="rounded-lg   text-black dark:text-white"
          >
            <TbSquareToggle size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-5 group-data-[collapsible=icon]:flex flex-col text-black dark:text-white">
          {/* //smallSidebar */}
          <Tooltip>
            <TooltipTrigger
              onClick={() => navigate(`/mentor/${mentorId}`)}
              className="hidden group-data-[collapsible=icon]:block"
            >
              <FaRegPenToSquare size={18} />
            </TooltipTrigger>

            <TooltipContent side="right">New Chat</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() => setOpen(true)}
              className="hidden group-data-[collapsible=icon]:block"
            >
              <HiOutlineMagnifyingGlass size={18} />
            </TooltipTrigger>

            <TooltipContent side="right">Search</TooltipContent>
          </Tooltip>

          <Popover>
            <PopoverTrigger
              className="
      hidden
      group-data-[collapsible=icon]:block
      cursor-pointer
      rounded-lg
    "
            >
              <TiPinOutline size={18} />
            </PopoverTrigger>

            <PopoverContent
              side="right"
              align="start"
              sideOffset={12}
              className="w-81.25 rounded-2xl   text-white"
            >
              <h3 className="ml-3 text-sm text-zinc-400">Recents</h3>

              <div className="flex flex-col gap-1 text-black dark:text-zinc-400">
                {allChats
                  ?.filter((chat) => chat.isPinned)
                  ?.slice(0, 10)
                  .map((chat) => (
                    <button
                      key={chat._id}
                      onClick={() => {
                        navigate(`/mentor/${mentorId}/${chat.chatId}`);
                      }}
                      className="
            w-full
            truncate
            rounded-lg
            px-2
            py-2
            text-left
            text-[15px]
          
            transition
           
          "
                    >
                      {chat.title || "Untitled chat"}
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Recent */}
          <Popover>
            <PopoverTrigger
              className="
      hidden
      group-data-[collapsible=icon]:block
      cursor-pointer
      rounded-lg
      p-1

    "
            >
              <IoChatbubbleOutline size={18} />
            </PopoverTrigger>

            <PopoverContent
              side="right"
              align="start"
              sideOffset={12}
              className="w-81.25 rounded-2xl  p-2 text-white"
            >
              <h3 className=" ml-3 text-sm text-zinc-400">Recents</h3>

              <div className="flex flex-col gap-1 text-black dark:text-zinc-400">
                {allChats
                  ?.filter((chat) => !chat.isPinned)
                  ?.slice(0, 10)
                  .map((chat) => (
                    <button
                      key={chat._id}
                      onClick={() => {
                        navigate(`/mentor/${mentorId}/${chat.chatId}`);
                      }}
                      className="
            w-full
            truncate
            rounded-lg
            px-2
            py-2
            text-left
            text-[15px]
           
            transition
       
          "
                    >
                      {chat.title || "Untitled chat"}
                    </button>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* //smallSidebar */}

          {/* //largSidebar */}
          <button
            onClick={() => navigate(`/mentor/${mentorId}`)}
            className=" group-data-[collapsible=icon]:hidden flex w-full items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 font-medium transition hover:bg-indigo-500 text-white"
          >
            <HiOutlinePlus size={18} />
            New Chat
          </button>

          <button
            onClick={() => setOpen(true)}
            className=" group-data-[collapsible=icon]:hidden flex w-full items-center gap-3 rounded-xl border border-zinc-700 px-4 py-3 transition dark:hover:bg-zinc-800 hover:bg-zinc-200"
          >
            <HiOutlineMagnifyingGlass size={18} />
            Search
          </button>
          <AlertSearch
            chats={allChats}
            setOpen={setOpen}
            open={open}
            onChatClick={(chat) => {
              console.log(chat);
            }}
          />
        </div>
      </SidebarHeader>

      {/* Content */}

      {/* Content */}
      <SidebarContent className=" group-data-[collapsible=icon]:invisible px-3 py-4 ">
        {/* Pinned */}
        <div className="mb-5">
          {allChats?.filter((chat) => chat.isPinned).length > 0 && (
            <>
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest  text-black dark:text-zinc-500">
                Pinned
              </p>

              <div className="flex flex-col gap-1 ">
                {allChats
                  ?.filter((chat) => chat.isPinned)
                  .map((chat) => (
                    <AppSidebarContent
                      key={chat._id}
                      chat={chat}
                      id={id}
                      mentorId={mentorId}
                      renamingChatId={renamingChatId}
                      setRenamingChatId={setRenamingChatId}
                    />
                  ))}
              </div>
            </>
          )}
        </div>

        {/* Recent */}
        <div>
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Recent
          </p>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-2">
              <span>Loading...</span>
              <Spinner className="size-4" />
            </div>
          ) : (
            <div className="space-y-1">
              {/* Processing Chat */}
              {processingChat && (
                <button className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-300">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {firstChat}
                  </motion.span>

                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
                </button>
              )}

              <Separator className="my-2" />

              {/* Recent Chats */}
              <div className="flex flex-col gap-1">
                {allChats
                  ?.filter((chat) => !chat.isPinned)
                  .map((chat) => (
                    <AppSidebarContent
                      key={chat._id}
                      chat={chat}
                      id={id}
                      mentorId={mentorId}
                      renamingChatId={renamingChatId}
                      setRenamingChatId={setRenamingChatId}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Footer */}
      <MySidebarFooter
        isAuthenticated={isAuthenticated}
        user={user}
      ></MySidebarFooter>
    </Sidebar>
  );
}
