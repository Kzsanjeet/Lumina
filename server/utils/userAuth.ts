import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { Request, Response, NextFunction } from "express";

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      return res.status(401).json({ success: false, message: "Access token not provided." });
    }

    // Verify access token
    try {
      const validUser = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY as string);
      req.user = validUser;
      return next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Attempt to refresh tokens if access token is expired and refresh token is available
        if (refreshToken) {
          return updateTokens(req, res, next);
        } else {
          return res.status(401).json({ success: false, message: "Access token expired and no refresh token provided." });
        }
      } else {
        return res.status(401).json({ success: false, message: "Invalid access token." });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred during authentication.", error: error.message });
  }
};

const updateTokens = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN as string);
    const userId = (decoded as any).id; // Adjust this according to your token payload

    // Fetch user from database (example using Prisma)
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ success: false, message: "Invalid refresh token." });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_KEY as string, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_TOKEN as string, { expiresIn: "1d" });

    // Update refresh token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    // Set cookies
    res.cookie("accessToken", newAccessToken, { httpOnly: true, maxAge: 60 * 60 * 1000 }); // 1 hour
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day

    req.user = { id: user.id };
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid refresh token." });
  }
};

export { validateUser, updateTokens };
