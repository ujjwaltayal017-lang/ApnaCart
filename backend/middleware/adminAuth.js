
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Admin token missing. Please login again."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only."
            });
        }

        req.adminEmail = decoded.email;

        next();

    } catch (error) {
        console.error("Admin Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired admin token."
        });
    }
};

export default adminAuth;
