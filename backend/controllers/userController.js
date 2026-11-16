import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(404).json({
                message: "User is not found"
            })
        }
        return res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({
                message: "Admin is not found"
            })
        }
        return res.status(201).json({
            email: adminEmail,
            role: "admin"
        })
    } catch (err) {
        console.log(err);
    }
}