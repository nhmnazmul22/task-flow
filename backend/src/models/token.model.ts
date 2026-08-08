import { TokenEnum, type IToken } from "@/types/auth.js";
import mongoose, { Model, Schema } from "mongoose";

const TokenSchema = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: null,
    },
    tokenHash: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(TokenEnum),
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const TokenModel =
  mongoose.models.Token ?? mongoose.model<IToken>("Token", TokenSchema);

export default TokenModel;
