import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { AlertCircle } from "lucide-react";

const AlertLogout = ({ open, setOpen, onConfirm }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isAuthenticated ? (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <span className="flex justify-center font-bold text-xl">
              Are you sure you want to log out?
            </span>
            <Card>
              <CardContent className="flex gap-3">
                <div>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.photo}
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span>{user?.name}</span>
                  <span className="text-xs">{user?.email}</span>
                </div>
              </CardContent>
            </Card>

            <AlertDialogAction onClick={onConfirm}>Logout</AlertDialogAction>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader className="items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>

              <AlertDialogTitle className="mt-3">
                Please Sign In First
              </AlertDialogTitle>

              <AlertDialogDescription>
                You need to sign in before continuing.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-2">
              <AlertDialogAction onClick={onConfirm}>Sign In</AlertDialogAction>

              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default AlertLogout;
