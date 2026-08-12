import type { UserType } from "@/types/users.js";
import mongoose, { Model, Schema } from "mongoose";

const UserSchema = new Schema<UserType>(
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
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: false,
      default: null,
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

const UserModel: Model<UserType> =
  mongoose.models.User ?? mongoose.model<UserType>("User", UserSchema);

export default UserModel;
