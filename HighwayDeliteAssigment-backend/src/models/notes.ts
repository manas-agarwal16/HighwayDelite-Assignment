import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface representing a Note document
export interface INote extends Document {
  content: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const noteSchema: Schema<INote> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the model
export const Note: Model<INote> = mongoose.model<INote>("Note", noteSchema);
