import ApiResponse from "@/app/utils/ApiResponse";
import connectDb from "@/app/utils/connectDb";
import { UserReview } from "@/models/userReview.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDb()
    try {
        const reviewData = await UserReview.find({}).select({ "FullName": 1, "Message": 1, "_id": 0, "createdAt": 1 })
        if (reviewData.length == 0) {
            return NextResponse.json(ApiResponse(200, "No Review Found"))
        }
        return NextResponse.json(ApiResponse(200, "Data Fetched", reviewData))
    } catch (error) {
        return NextResponse.json(ApiResponse(500, "Error Fetching Reviews"))
    }
}