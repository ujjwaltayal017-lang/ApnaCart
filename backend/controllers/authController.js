import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken, generateTokenAdmin } from "../db/token.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        return res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error("Error in register controller:", error.message);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        }
        let token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await generateTokenAdmin(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
            })
            return res.status(200).json(token);
        }
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    } catch (err) {
        console.log("Admin Login Error", err);
    }
}