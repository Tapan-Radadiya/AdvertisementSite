import ApiResponse from "@/app/utils/ApiResponse";
import connectDb from "@/app/utils/connectDb";
import { UserReview } from "@/models/userReview.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDb()
    const { FullName, Message } = await req.json()
    if (!FullName || !Message) {
        return NextResponse.json(ApiResponse(422, "All Fields Required"))
    }

    const checkUserExist = await UserReview.find({ FullName: FullName })
    
    if (checkUserExist.length != 0) {
        return NextResponse.json(ApiResponse(409, "Review With This UserName Already Registered"))
    }

    if (FullName.length < 6 || FullName.length > 20) {
        return NextResponse.json(ApiResponse(409, "UserName Should Be In Range Of (7-20)"))
    }

    if (Message.length < 20 || Message.length > 200) {
        return NextResponse.json(ApiResponse(409, "Message Should Be In Range Of (20-200)"))
    }

    try {
        const addReview = await UserReview.create({
            FullName, Message
        })
        if (!addReview) {
            return NextResponse.json(ApiResponse(500, "Error Submitting Review Try After Some Time"))
        }
        return NextResponse.json(ApiResponse(201, "Thank You For Your Review"))
    } catch (error) {
        return NextResponse.json(ApiResponse(500, "Error Try After Some Time", { error }))
    }
}