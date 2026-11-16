import jwt from "jsonwebtoken"



const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User does not have valid Token" });
        }
        // Here you would typically verify the token
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(401).json({ message: "User does not have Valid Token" });
        }
        req.userId = verifyToken.userId
        next();
    }catch(err){
        console.log(err);
    }

}

export default isAuth;