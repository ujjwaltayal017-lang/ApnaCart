import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
    // role: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     default: "user"
    // }
}, {timestamps: true, minimize: false});

const User = mongoose.model("User", UserSchema)

export default User;