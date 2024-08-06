import express from "express";
const userRouter = express.Router()

import {createUser, getSpecificData, getUser, loginUser, resetPassword} from "../controller/userController"


userRouter.route("/register").post(createUser)
userRouter.route("/get-user").get(getUser)
userRouter.route("/get-specific").get(getSpecificData)
// for login in user
userRouter.route("/login").post(loginUser)
userRouter.route("/resetPassword").post(resetPassword)

export default userRouter;
