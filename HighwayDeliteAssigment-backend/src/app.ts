import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// route imports
import authRouter from "./routes/auth";
import notesRouter from "./routes/notes";

// initialize express app
const app: Application = express();

// allowed origins
// const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
const allowedOrigins: string[] = ["http://localhost:5173"];

// middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" })); // incoming requests in JSON
app.use(express.urlencoded({ extended: true })); // incoming requests in urlencoded
app.use(express.static("public")); // serve static files

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome HighwayDelite Team. This is the backend API for HighwayDelite Assignment");
});

// use routes
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

export { app };
