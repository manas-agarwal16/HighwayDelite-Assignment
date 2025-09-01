import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Note } from "../models/notes";
import mongoose from "mongoose";

// ---------- Create Note ----------
const CreateNote = asyncHandler(async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = (req as any).userId; // assumes middleware sets req.userId

  if (!content) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Content is required"));
  }

  if (!userId) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Unauthorized: user not found"));
  }

  const note = await Note.create({ content, userId });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note created successfully"));
});

// ---------- Delete Note ----------
const DeleteNote = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Invalid note ID format"));
  }

  const note = await Note.findOneAndDelete({ _id: id, userId });
  if (!note) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Note not found or unauthorized"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Note deleted successfully"));
});

export { CreateNote, DeleteNote };
