import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import connectToDatabase from "../server/controller/dbConnect";
import app from "./app";

// Load environment variables from .env
dotenv.config();

// Invoke the database connection
connectToDatabase();

const prisma = new PrismaClient();


app.get("/", (req, res) => {
  res.send("Hello World");
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
