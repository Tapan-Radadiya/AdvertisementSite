import { userReview_Interface } from "@/app/Interfaces/userReview";
import mongoose from "mongoose";

const UserReviewSchema = new mongoose.Schema<userReview_Interface>({
    FullName: {
        type: String,
        minlength: [6, "UserName Shoud Have Atleast 6 Characters"],
        maxlength: [20, "UserName Should Not Exceed More Then 20 Character"],
        required: true,
        unique: true
    },
    Message: {
        type: String,
        minlength: [20, "Message Should Contain Atleast 20 Characters"],
        maxlength: [100, "Message Should Not Contain MoreThen 100 Characters"],
        required: true
    }
}, { timestamps: true })

export const UserReview = mongoose.models.UserReview || mongoose.model("UserReview", UserReviewSchema)