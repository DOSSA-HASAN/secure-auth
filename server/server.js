import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/mongodb.js"
import authRoute from "./routes/authRoutes.js"
import path from "path"

const app = express()
const port = process.env.PORT || 5000
const __dirname = path.resolve()

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use('/api/auth', authRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../secure-auth/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../secure-auth", "dist", "index.html"))
    })
}

app.listen(port, () => { console.log(`Server is running on port: ${port}`) })