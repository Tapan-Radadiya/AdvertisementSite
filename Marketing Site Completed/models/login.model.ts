import { UserLogin_interface } from "@/app/Interfaces/userlogin";
import mongoose from "mongoose";
import validator from "validator";

const UserLoginSchema = new mongoose.Schema<UserLogin_interface>({
    EmailId: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalid EmailId"]
    },
    Password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "Please Provide Strong Password"]
    },
    Role: {
        type: String,
        required:true,
        enum: {
            values: ["ADMIN", "USER"],
            message: "Invalid Enum Value"
        }

    }
}, { timestamps: true })

export const UserLogin = mongoose.models.UserLogin || mongoose.model("UserLogin", UserLoginSchema)