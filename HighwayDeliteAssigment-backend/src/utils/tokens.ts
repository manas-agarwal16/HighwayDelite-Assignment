import jwt, { Secret } from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_KEY as Secret, // assert type
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m", // fallback to avoid undefined
    }
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_KEY as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    }
  );
};

export { generateAccessToken, generateRefreshToken };
