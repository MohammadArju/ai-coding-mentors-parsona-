import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    firebaseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("PersonaUser", userSchema);

export default User;
