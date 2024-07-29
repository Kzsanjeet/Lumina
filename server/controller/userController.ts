import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Register User
const createUser = async (req: Request, res: Response) => {
  const { name, email, password, contact } = req.body;

  try {
    const registerUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        contact : "",
        twoFAEnabled: false, // Set default value
        wrongPasswordCounter: 0, // Set default value
        isPassBlockEnabled: false, // Set default value
        lastFivePassword: [], // Initialize empty array
        createdAt: new Date(), // Set current date/time
      },
    });

    if (!registerUser) {
      return res.status(400).json({ message: "User not created" });
    }

    return res
      .status(200)
      .json({ message: "User created successfully", data: registerUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export  {createUser};
