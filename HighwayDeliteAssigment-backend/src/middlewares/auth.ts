import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/users";
import { ApiResponse } from "../utils/ApiResponse";

// Extend Express Request type to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: typeof User.prototype; // You can refine this type based on your User model interface
  }
}

// Define decoded token type
interface DecodedToken extends JwtPayload {
  _id: string;
}

const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res
          .status(401)
          .json(new ApiResponse(401, "", "Unauthorized Request"));
      }

      // Verify token
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY as string
      ) as DecodedToken;

      if (!decodedToken || !decodedToken._id) {
        return res
          .status(401)
          .json(new ApiResponse(401, "", "Error decoding access token"));
      }

      // Find user
      const user = await User.findOne({ _id: decodedToken._id }).select(
        "-password -refreshToken"
      );

      if (!user) {
        return res
          .status(401)
          .json(
            new ApiResponse(401, "", "Unauthorized Request - User not found")
          );
      }

      req.user = user;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json(new ApiResponse(401, "", "Token expired. Please log in again."));
      }
      return res
        .status(401)
        .json(new ApiResponse(401, "", "Unauthorized Request"));
    }
  }
);

export { verifyJWT };
