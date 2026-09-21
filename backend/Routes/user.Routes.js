import express from "express"
import { UserLgout, UserRegister } from "../controllers/user.controller.js";
const router = express.Router();


router.post("/register",UserRegister)
router.get("/logout",UserLgout)


export default router