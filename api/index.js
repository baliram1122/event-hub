import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from  "./routes/auth.js"
import usersRoute from  "./routes/users.js"
import eventsRoute from  "./routes/events.js"
import router from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()

dotenv.config()
 
const connect = async () => {

try {
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongodb")
} catch (error) {
    throw error
}
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

// middlewares
app.use(cookieParser())

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/events", eventsRoute)
app.use(bodyParser.json({ limit: '10mb' }));

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong!"
    

    return res.status(500).json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack,
    })
})
app.use(cors());

app.listen(8800, () => {
    connect()
    console.log("connected to backend") 
    
})