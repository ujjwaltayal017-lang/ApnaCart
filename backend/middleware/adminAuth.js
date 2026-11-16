import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {

    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(400).json({
                message: "Not Authorized Login Again"
            })
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }

        req.adminEmail = process.env.ADMIN_EMAIL;

        next();
    } catch (err) {
        console.log("Admin Error", err);
    }
}

export default adminAuth;


// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//     try {
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).json({
//                 message: "Not Authorized. Login Again."
//             });
//         }

//         const verifyToken = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         if (!verifyToken) {
//             return res.status(401).json({
//                 message: "Invalid Token"
//             });
//         }

//         req.adminEmail = process.env.ADMIN_EMAIL;

//         next();

//     } catch (err) {
//         console.log("Admin Auth Error:", err);

//         return res.status(401).json({
//             message: "Admin authentication failed. Login again."
//         });
//     }
// };

// export default adminAuth;


// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Admin token missing. Please login again."
//             });
//         }

//         const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

//         if (!verifyToken) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token"
//             });
//         }

//         // Basic admin identity check
//         if (
//             verifyToken.email !== process.env.ADMIN_EMAIL &&
//             verifyToken.role !== "admin"
//         ) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Access denied. Admin only."
//             });
//         }

//         req.adminEmail = verifyToken.email;
//         next();

//     } catch (err) {
//         console.error("Admin Auth Error:", err.message);

//         return res.status(401).json({
//             success: false,
//             message: "Admin authentication failed. Please login again."
//         });
//     }
// };

// export default adminAuth;