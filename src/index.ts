import dotenv from "dotenv"
dotenv.config()

import app from "./server"
import connectDB from "./config/db"
import swagger from "./config/swagger";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB()
  swagger(app)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${`http://localhost:${PORT}`}`)
  })
}

startServer()