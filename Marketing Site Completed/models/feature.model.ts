import { Feature_interface } from "@/app/Interfaces/feature";
import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema<Feature_interface>({
    Title: {
        type: String,
        required: true,
        minlength: [6, "Title Should Be In Range Of (6-35) With WhiteSpaces"],
        maxlength: [35, "Title Should Be In Range Of (6-35) With WhiteSpaces"],
        unique: true
    },
    Feature_Detail: {
        type: String,
        required: true,
        minlength: [10, "Feature Description Should Be In Range Of (10-200) With WhiteSpaces"],
        maxlength: [200, "Feature Description Should Be In Range Of (10-200) With WhiteSpaces"]
    }
})

export const Feature = mongoose.models.Feature || mongoose.model("Feature", FeatureSchema)