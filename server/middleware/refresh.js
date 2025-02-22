import jwt from "jsonwebtoken"
import "dotenv/config"

export const refresh = (req, res) => {
    const rToken = req.cookies?.refreshToken

    try {

        if (!rToken) {
            return res.status(404).json({ message: "no refresh token found" })
        }

        jwt.verify(rToken, process.env.REFRESH_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.json({ message: err.message })
                }

                const accessToken = jwt.sign(
                    { id: decoded.id },
                    process.env.SECRET_KEY,
                    { expiresIn: '15m' }
                )

                return res.json({ success: true, accessToken })
            }
        )

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}