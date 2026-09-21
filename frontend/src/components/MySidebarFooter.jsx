import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const MySidebarFooter = ({ isAuthenticated, user }) => {
  return (
    <>
      {isAuthenticated ? (
        <SidebarFooter className="border-t border-zinc-800 text-black dark:text-zinc-400">
          <div className="flex items-center justify-between ">
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 rounded-xl transition">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user?.photo} />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>

                <div className="text-left group-data-[collapsible=icon]:hidden">
                  <p className="text-xs">{user?.name}</p>
                  <p className="text-xs ">Free Plan</p>
                </div>
              </PopoverTrigger>

              <PopoverContent
                side="top"
                sideOffset={10}
                className="w-64 dark:bg-zinc-900 text-black dark:text-zinc-400 border-zinc-700 bg-white"
              >
                <div className="flex items-center gap-3 ">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-zinc-400">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-zinc-700 pt-3 flex flex-col gap-3">
                 <div>
                   <p className="text-sm text-zinc-400">Current Plan</p>

                  <p className="mt-1 text-sm">Free Plan</p>
                 </div>
                 <Button>Log out</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="outline"
              className="group-data-[collapsible=icon]:hidden"
            >
              Upgrade
            </Button>
          </div>
        </SidebarFooter>
      ) : (
        <SidebarFooter>
          <Button variant="outline">
            <HiOutlineArrowRightOnRectangle />
            Sign In
          </Button>
        </SidebarFooter>
      )}
    </>
  );
};

export default MySidebarFooter;
