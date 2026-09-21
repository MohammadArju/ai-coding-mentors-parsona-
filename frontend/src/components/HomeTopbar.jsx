import { FaRobot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { API } from "@/constants/RoutesName";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import AlertLogout from "./AlertLogout";
import { useState } from "react";

import { api } from "@/constants/api";
import { toast } from "react-toastify";
import { logout } from "@/redux/userSlice";
// import { useTheme } from "./theme-provider";
import { useTheme } from "@/components/theme-provider";

const HomeTopbar = () => {
  const { theme,setTheme} = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    setOpen(false);
    try {
      const response = await api.get(`${API.USER.LOGOUT}`);
      dispatch(logout());
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-between w-full max-w-6xl mx-auto my-3">
      <div className="flex items-center gap-3 ">
        <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 via-violet-600 to-fuchsia-600 shadow-lg">
          <FaRobot className=" text-white" />
        </div>
        <div>
          <div>
            <h1 className="font-bold text-sm sm:text-base">AI Coding Mentor</h1>
          </div>
          <p className="text-gray-500  text-xs ">
            Learn coding with india`s top educators
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        {/* Social Icons */}

        <Link
          to="https://github.com/MohammadArju?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg dark:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
        >
          <FaGithub />
        </Link>

        <Link
          to="#"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg dark:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-lg"
        >
          <FaLinkedinIn />
        </Link>
        <button onClick={() => {
          theme=== "light" ? setTheme("dark") : setTheme("light") 
        }} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg dark:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500/20 hover:text-blue-400 hover:shadow-lg">
          {theme === "light" ? <MdLightMode /> : <MdDarkMode />}
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-white/10" />

        {/* Sign In Button */}
        {isAuthenticated ? (
          <>
            {" "}
            <Button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 via-violet-600 to-fuchsia-600 px-4 py-1.5 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/40"
            >
              Logout
            </Button>
            <AlertLogout
              open={open}
              setOpen={setOpen}
              onConfirm={handleLogout}
            ></AlertLogout>
          </>
        ) : (
          <Link
            to={API.LOCAL.LOGIN}
            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 via-violet-600 to-fuchsia-600 sm:px-6 px-4 py-1.5 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/40"
          >
            <span className="whitespace-nowrap">Sign In</span>
            <CiLogin className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeTopbar;
