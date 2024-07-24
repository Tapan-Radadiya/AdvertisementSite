import ApiResponse from "@/app/utils/ApiResponse";
import connectDb from "@/app/utils/connectDb";
import { Contact } from "@/models/contactUs.model";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDb()
    const {
        FullName, Email, Message
    } = await req.json()
    if (!FullName || !Email || !Message) {
        return NextResponse.json(ApiResponse(422, "All Fields Required"))
    }
    if (FullName.length <= 6) {
        return NextResponse.json(ApiResponse(409, "Full Name Must Container More Then 6 Character"))
    }
    if (!validator.isEmail(Email)) {
        return NextResponse.json(ApiResponse(409, "Invalid Email Id"))
    }
    if (Message.length <= 15) {
        return NextResponse.json(ApiResponse(409, "Message Needs To Be MoreThen 15 Characters"))
    }
    try {

        const createContactUs = await Contact.create({
            FullName,
            Email,
            Message
        })
        console.log(createContactUs);

        if (!createContactUs) return NextResponse.json(ApiResponse(500, "Error Try After SomeTime"))
        return NextResponse.json(ApiResponse(201, "Thank You For Your Message"))
    } catch (error) {
        console.log(error)
        return NextResponse.json(ApiResponse(500, "Error", error))
    }
}