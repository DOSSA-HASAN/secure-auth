import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.json({ success: false, message: "Not Authorized, please login again" })
    }

    try {
        
        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY)

        if (!tokenDecode.id) {
            return res.json({ success: false, message: "no id was found" })
        }

        req.body.userId = tokenDecode.id

        next()

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default userAuth