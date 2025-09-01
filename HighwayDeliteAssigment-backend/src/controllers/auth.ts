import { Request , Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/users";
import { generateOTP , sendOTPThroughEmail} from "../utils/otp";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";

// ---------- Signup ----------
const Signup = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, dob } = req.body;

    if(!name || !email || !dob){
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Email already exists"));
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60000);

    const user = await User.create({ name, email, dob, otp, otpExpires });
    user.save();

    sendOTPThroughEmail(email, otp);

    return res.json(new ApiResponse(200, { otp }, "Signup successful. OTP has been sent to your email for verification."));
});

// ---------- Signin ----------
const Signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, keepLoggedIn } = req.body;

  if (!email) {
    return res.status(400).json(new ApiResponse(400, null, "Email is required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  sendOTPThroughEmail(email, otp);

  if(keepLoggedIn){
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const options : {
      sameSite: "lax" | "strict" | "none";
      httpOnly: boolean;
      secure: boolean;
      maxAge: number;
    } = {
      sameSite: "none",
      httpOnly: true, // only server can access cookie not client side.
      secure: true,
      maxAge: 60 * 24 * 60 * 1000, //1d
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(201, user, "User has logged in successfully"));
  }

  return res.json(
    new ApiResponse(200, user, "OTP sent for verification")
  );
});

export { Signup, Signin };

