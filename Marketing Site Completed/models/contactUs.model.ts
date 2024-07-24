import { ContactUs_interface } from "@/app/Interfaces/contactUs";
import mongoose from "mongoose";
import validator from "validator";

const ContactSchema = new mongoose.Schema<ContactUs_interface>({
    FullName: {
        type: String,
        minlength: [6, "Full Name Should Container More Then 6 Character"],
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Invalid Email-Id"],
    },
    Message: {
        type: String,
        required: true,
        minlength: [10, "Message Should Have Morethen 10 Character"],
        maxlength: [150, "Message Should Not Exceed MoreThen 150 Character"]
    }

}, { timestamps: true })

export const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema)