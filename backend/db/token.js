import jwt from "jsonwebtoken";

// Token Generate for Users
export const generateToken = async (userId) => {
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token
    }catch(error){
        console.log("Error in generating token:", error.message);
    }
}


// Token Generate for Admin
export const generateTokenAdmin = async (email) => {
    try{
        const token = await jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token
    }catch(error){
        console.log("Error in generating token:", error.message);
    }
}