import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import MentorChat from "@/pages/MentorChat";
import Login from "@/pages/Login";
import { API } from "@/constants/RoutesName";
import Temporary from "@/pages/Temporary";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route
          path="mentor/:mentorId/:id?"
          element={<MentorChat></MentorChat>}
        ></Route>
        <Route path="/mentor/:mentorId" element={<Temporary />} />
      </Route>
      <Route path={API.LOCAL.HOME} element={<Home></Home>}></Route>
      <Route path={API.LOCAL.LOGIN} element={<Login></Login>}></Route>
    </Routes>
  );
};

export default AppRoutes;
