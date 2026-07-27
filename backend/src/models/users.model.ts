import type { UserSchemaType } from "@/types/users.js";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<UserSchemaType>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    avatarUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
