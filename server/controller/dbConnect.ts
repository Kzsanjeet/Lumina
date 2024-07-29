// Connect to PostgreSQL using Prisma
import prisma  from '../utils/prisma';


async function connectToDatabase() {
    try {
      await prisma.$connect()
      console.log("Connected to PostgreSQL database with Prisma")
    } catch (error) {
      console.error("Unable to connect to PostgreSQL database with Prisma", error)
    }
  }
  
  export default connectToDatabase