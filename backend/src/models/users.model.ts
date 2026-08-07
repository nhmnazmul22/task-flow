import type { UserModelSchema } from "@/types/users.js";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema = new Schema<UserModelSchema>(
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
      enum: ["admin", "user"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel =
  mongoose.models.User ?? mongoose.model<UserModelSchema>("User", UserSchema);

export default UserModel;
