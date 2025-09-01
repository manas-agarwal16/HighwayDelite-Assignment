import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.ACCESS_TOKEN_KEY as Secret,
    {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as string) || "15m",
    } as SignOptions
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_KEY as Secret,
    {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRY as string) || "7d",
    } as SignOptions
  );
};

export { generateAccessToken, generateRefreshToken };