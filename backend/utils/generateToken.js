import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  try {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};