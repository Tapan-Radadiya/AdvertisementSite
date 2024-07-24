import ApiResponse from "@/app/utils/ApiResponse";
import connectDb from "@/app/utils/connectDb";
import { Feature } from "@/models/feature.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDb()
    try {
        const getData = await Feature.find({})
        if (getData.length == 0) {
            return NextResponse.json(ApiResponse(200, "There Is No Feature Here"))
        }
        return NextResponse.json(ApiResponse(200, "Data Fetched", getData))
    } catch (error) {
        return NextResponse.json(ApiResponse(500, "Error Fetching Data Try After SomeTime"))
    }
}