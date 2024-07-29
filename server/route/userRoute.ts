import express from "express";
const userRouter = express.Router()

import {createUser} from "../controller/userController"


userRouter.route("/register").post(createUser)

export default userRouter;