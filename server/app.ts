import express from "express";
const app = express()

import userRouter from "../server/route/userRoute"

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/v1/user",userRouter)




export default app;


