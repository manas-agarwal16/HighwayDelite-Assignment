import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import connectDb from "./db/connectDB";
import { app } from "./app";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

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
