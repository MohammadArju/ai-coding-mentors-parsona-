import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";

import { API } from "@/constants/RoutesName";
import { api } from "@/constants/api";
import { useDispatch } from "react-redux";
import { login } from "@/redux/userSlice";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate = useNavigate()

  const state = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      firebaseId: user.uid,
    };
    const response = await api.post(`${API.USER.REGISTER}`, data);
    dispatch(login({ user: response.data.user }));
    navigate(API.LOCAL.HOME)
    toast.success(response.data.message);
    try {
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-fuchsia-600 shadow-lg">
            <span className="text-3xl font-bold text-white">AI</span>
          </div>

          <CardTitle className="text-2xl font-bold text-white">
            Welcome 👋
          </CardTitle>

          <p className="text-sm text-slate-400">
            Sign in with your Google account to continue.
          </p>
        </CardHeader>

        <CardContent>
          <Button
            onClick={googleLogin}
            className="h-12 w-full gap-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <span className="cursor-pointer text-purple-400 hover:underline">
              Terms
            </span>{" "}
            and{" "}
            <span className="cursor-pointer text-purple-400 hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
