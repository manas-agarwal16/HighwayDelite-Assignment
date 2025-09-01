import mongoose, { Document, Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";

// Define an interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  dob: string;
  otp?: string | null;
  otpExpires?: Date | null;
  refreshToken?: string | null;
  googleId? : string | null;
  authProvider: "google" | "email";
}

// Define the schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true, // corrected from `require` to `required`
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    dob: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["google", "email"],
      required: true,
    },
  },
  { timestamps: true }
);

// JWT methods
// userSchema.methods.generateAccessToken = function (): string {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       name: this.name,
//     },
//     process.env.ACCESS_TOKEN_KEY as string,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//   );
// };

// userSchema.methods.generateRefreshToken = function (): string {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_KEY as string,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//   );
// };

// Create and export the model
export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
