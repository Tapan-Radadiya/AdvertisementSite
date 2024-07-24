// 'use client'
import ApiResponse from "@/app/utils/ApiResponse";
import connectDb from "@/app/utils/connectDb";
import { Feature } from "@/models/feature.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDb()
    const { Title, Feature_Details } = await req.json()
    if (!Title || !Feature_Details) {
        return NextResponse.json(ApiResponse(422, "All Fields Required"))
    }
    if (Title.length <= 6 || Title.length > 35) {
        return NextResponse.json(ApiResponse(409, "Title Should Be In Range Of (6-35) With WhiteSpaces"))
    }
    if (Feature_Details.length < 10 || Feature_Details.length > 200) {
        return NextResponse.json(ApiResponse(409, "Feature Description Should Be In Range Of (10-200) With WhiteSpaces"))
    }
    console.log(Title, Feature_Details)
    try {
        const addFeature = Feature.create({
            Title,
            Feature_Detail: Feature_Details
        })
        if (!addFeature) return NextResponse.json(ApiResponse(500, "Error Adding Feature Try After SomeTime"))
        return NextResponse.json(ApiResponse(201, "New Feature Added"))
    } catch (error) {
        return NextResponse.json(ApiResponse(500, "Internal Server Error"))
    }
}