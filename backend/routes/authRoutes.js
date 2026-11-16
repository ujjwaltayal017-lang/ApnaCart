// const express = require("express");
// const router = express.Router();

// const { registerUser, loginUser } = require("../controllers/authController");
import express from "express";
import { register, login, logout, googleLogin, adminLogin } from "../controllers/authController.js";


const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.get("/logout", logout);

authRoutes.post("/google-login", googleLogin);

authRoutes.post("/adminlogin", adminLogin)


export default authRoutes;