import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/connectDB";
import { app } from "./app";

console.log("PORT :",process.env.PORT);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error("Express cannot connect with database:", err.message);
    } else {
      console.error("Unknown error connecting with database:", err);
    }
  });
