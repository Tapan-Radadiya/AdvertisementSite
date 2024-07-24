import { User_Register_Interface } from "@/app/Interfaces/userForm";
import mongoose from "mongoose";
import validator from "validator";
import fs from 'fs'
async function validateCity(cityName: any) {
    const cityData = await JSON.parse(fs.readFileSync("models/signin.model.ts", 'utf-8'))
    if (cityData.filter((elem: string) => elem == cityName)) {
        return true
    }
    else return false
}
const UserScheama = new mongoose.Schema<User_Register_Interface>({
    UserName: {
        type: String,
        minlength: [6, "UserName Shoud Have Atleast 6 Characters"],
        maxlength: [20, "UserName Should Not Exceed More Then 20 Character"],
        required: true,
        unique: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalid Email Id"]
    },
    DateOfBirth: {
        type: Date,
        required: true,
    },
    Gender: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true,
    },
    ZipCode: {
        type: String,
        required: true,
        minlength: [6, "Invalid ZipCode"],
        maxlength: [6, "Invalid ZipCode"],
    },
    Password: {
        type: String,
        required: true,
        validate: [validator.isStrongPassword, "Please Provide Strong password"]
    }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", UserScheama) 