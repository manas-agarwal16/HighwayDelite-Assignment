import { Router } from "express";
import { CreateNote, DeleteNote } from "../controllers/notes";
import { verifyJWT } from "../middlewares/auth";

const router = Router();

router.post("/", verifyJWT, CreateNote);
router.delete("/:id", verifyJWT, DeleteNote);

export default router;
