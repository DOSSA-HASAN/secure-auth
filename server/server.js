import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./config/mongodb.js"
import authRoute from "./routes/authRoutes.js"

const app = express()
const port = process.env.PORT || 5000

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))

app.get('/', (req, res) => {
    res.send("API Working...")
})

app.use('/api/auth', authRoute)

app.listen(port, () => { console.log(`Server is running on port: ${port}`) })