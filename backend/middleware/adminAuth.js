import jwt from "jsonwebtoken";

const admintAuth = async (req, res, next) => {

    try {
        const { token } = req.headers
        if (!token) {
            return res.status(400).json({message : "Not Authorized"})
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({message : "Not Authorized"})
        }
        next()

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}
export default admintAuth
