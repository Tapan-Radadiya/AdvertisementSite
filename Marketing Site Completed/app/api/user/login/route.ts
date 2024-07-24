import ApiResponse from "@/app/utils/ApiResponse";
import { User } from "@/models/signup.model";
import { NextRequest, NextResponse } from "next/server";
import { comparePass } from "@/app/utils/encryptPass";
import { createToken } from "@/app/utils/jwtData";
import Cookies from 'js-cookie'
export async function POST(req: NextRequest, res: NextResponse) {
    const { UserEmail, UserPassword } = await req.json()
    if (!UserEmail || !UserPassword) {
        return NextResponse.json(ApiResponse(422, "All Fields Required"))
    }
    const checkUser: any = await User.findOne({ UserEmail: UserEmail })
    if (!checkUser) {
        return NextResponse.json(ApiResponse(404, "User Does Not Exist"))
    }
    if (!comparePass(UserPassword, checkUser.Password)) {
        return NextResponse.json(ApiResponse(409, "Invalid Email Or Password"))
    }

    const jwtToken = await createToken(UserEmail, checkUser.Role)

    return NextResponse.json(ApiResponse(200, "User Logged In", { cookie: jwtToken }))
}

