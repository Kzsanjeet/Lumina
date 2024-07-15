import express from "express"
import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"

// Load environment variables from .env
dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Connect to PostgreSQL using Prisma
async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log("Connected to PostgreSQL database with Prisma")
  } catch (error) {
    console.error("Unable to connect to PostgreSQL database with Prisma", error)
  }
}

connectToDatabase()

app.get("/", (req, res) => {
  res.send("Hello World")
})

//for creating a new user
app.post("/api/v1/user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: "email@gmail.com",
      name: "John Doe",
    },
  })
  res
    .status(200)
    .json({ success: true, message: "User added successfully!", data: user })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) ///hello //hi