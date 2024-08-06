import ApiResponse from "../utils/ApiResponse";
import prisma from "../utils/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import {sendOtpEmail,generateOtp} from "../utils/genrateOtp"



const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const registerUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        contact: "",
        twoFAEnabled: false, // Set default value
        otp: null,
        otpTimestamp: null,
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

const getUser = async(req: Request, res:Response)=>{
  try {
    const getUserData = await prisma.user.findMany();
    return res.status(200).json({ success:true, message: "User data fetched successfully", data: getUserData})
  } catch (error) {
    res.status(400).json({success:false, message:"error",error})
  }
}

const getSpecificData = async(req:Request, res:Response)=>{
  try {
    const getUs = await prisma.user.findMany({
      select:{
        name: true,
        email: true,
      }
    })
    if(!getUs) return res.status(400).json({message:"User not found",success:false})

    res.status(200).json(new ApiResponse(200, "User fetched",getUs))
  } catch (error) {
    res.status(400).json({success:false, message:"error",error})
  }
}


const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or password not received",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (!process.env.ACCESS_SECRET_KEY || !process.env.REFRESH_SECRET_KEY) {
      throw new Error("Secret keys are not set");
    }

    if (!user.twoFAEnabled) {
      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_KEY as string);
      const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET_KEY as string);

      if (accessToken && refreshToken) {
        const oneHourInMillis = 60 * 60 * 1000;
        const oneDayInMillis = 24 * 60 * 60 * 1000;

        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: oneHourInMillis });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: oneDayInMillis });

        return res.status(200).json({ success: true, message: "Login successful", accessToken, refreshToken });
      }
    } else {
      const otp = generateOtp(6); // Generate a 6-digit OTP
      sendOtpEmail(user.email, otp);

      // Save OTP and timestamp to user (or to a separate table for OTPs)
      await prisma.user.update({
        where: { id: user.id },
        data: { otp:otp, otpTimestamp: new Date() },
      });
      // console.log(otp)
      return res.status(200).json({ success: true, message: "OTP sent to your email" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in user:", error.message, error.stack);
    } else {
      console.error("Unknown error:", error);
    }
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// Request password reset
const resetPassword = async (req: Request, res: Response) => {
  try{
  const { token,otp,newPassword} = req.body;

  if(!token && !otp && !newPassword){
    return res.status(400).json({ success: false, message: "Missing required fields"})
  }

   const verifyJwt = jwt.verify(token, process.env.RESET_PASSWORD_SECRET as string);
   if (!verifyJwt) {
     return res.status(400).json({ success: false, message: "Invalid token" });
   }

   const { email } = verifyJwt as { email: string };
   if (!email) {
     return res.status(400).json({ success: false, message: "Invalid token payload" });
   }

   const user = await prisma.user.findUnique({ where: { email } });
   if (!user) {
     return res.status(404).json({ success: false, message: "User not found" });
   }

   // Check if the provided OTP matches the one saved in the database
   if (user.otp !== otp) {
     return res.status(400).json({ success: false, message: "Invalid OTP" });
   }
 
   const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

   await prisma.user.update({
     where: { email },
     data: {
       password: hashedPassword
     },
   });

   return res.status(200).json({ success: true, message: "Password successfully reset" });
 } catch (error) {
   console.error("Error resetting password:", error);
   return res.status(500).json({ success: false, message: "Internal server error" });
 }
};


// const logout = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID not found in request",
//       });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Clear the refreshToken in the database
//     await prisma.user.update({
//       where: { id: userId },
//       data: { refreshToken: null },
//     });

//     // Clear cookies
//     res.clearCookie("refreshToken");
//     res.clearCookie("accessToken");

//     return res.status(200).json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };


// const twoFA = async(req:Request,res:Response)=>{
//   try {
//     const {email,password} = req.body;
//     const user = await prisma.user.findUnique({where:{email}});
//     if(!user) return res.status(400).json({success:false,message:"User not found"})
//       const checkPassword = bcrypt.compareSync(password,user.password)
//     if(!checkPassword) return res.status(400).json({success:false,message:"Invalid password"})
//   } catch (error) {
    
//   }
// }


export  {createUser,getUser, getSpecificData, loginUser , resetPassword};
