import jwt from "jsonwebtoken"
import "dotenv/config"

export const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    try {

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(404).json({ message: "Not authrized" })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (!decoded || !decoded.id) {
            return res.status(403).json({ message: "Invalid token" })
        }

        req.userId = decoded.id
        next()

    } catch (error) {
        return res.json(500).json({ message: error.message })
    }


}