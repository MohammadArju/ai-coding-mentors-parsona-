import User from "../Models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const UserRegister = async (req, res) => {
  try {
    const { name, email, photo, firebaseId } = req.body;
    if (!name || !email || !firebaseId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required information",
      });
    }
    const data = { name, email, photo, firebaseId };
    let user = await User.findOne({ firebaseId });
    if (!user) {
      user = await User.create(data);
      generateToken(res, user);
      return res
        .status(201)
        .json({ success: true, message: "User SignIn successfully", user });
    }
    generateToken(res, user);
    return res
      .status(200)
      .json({ success: true, message: `Welcome Back, ${user.name}`, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const UserLgout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res
      .status(201)
      .json({ success: true, message: "User Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
