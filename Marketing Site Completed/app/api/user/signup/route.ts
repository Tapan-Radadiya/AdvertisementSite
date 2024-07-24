import ApiResponse from "@/app/utils/ApiResponse";
import { User } from "@/models/signup.model";
import { NextRequest, NextResponse } from "next/server";
import city_data from "../../../Json Data Files/Indian_city.json"
import validator from "validator";
import { UserLogin } from "@/models/login.model";
import connectDb from "@/app/utils/connectDb";
import { encryptPass } from "@/app/utils/encryptPass";
import { createToken } from "@/app/utils/jwtData";
const gender = ["MALE", "FEMALE", "OTHER"]
export const POST = async (request: NextRequest, response: NextResponse) => {
    await connectDb()

    const {
        UserName,
        UserEmail,
        DateOfBirth,
        Gender,
        City,
        ZipCode,
        Password } = await request.json()
    if (!UserName ||
        !UserEmail ||
        !DateOfBirth ||
        !Gender ||
        !City ||
        !ZipCode ||
        !Password) {
        return NextResponse.json(ApiResponse(422, "All Fields Required"))
    }

    if (UserName.length <= 6) { return NextResponse.json(ApiResponse(409, "UserName Should Have More Then 6 Character")) }

    const checkUser = await User.find(
        { $or: [{ UserName: UserName }, { UserEmail: UserEmail }] }
    )

    if (checkUser.length != 0) {
        return NextResponse.json(ApiResponse(409, "This UserName Or EmailId Already Registered"))
    }

    const checkGender = gender.includes(Gender.toUpperCase())
    if (!checkGender) { return NextResponse.json(ApiResponse(409, "Invalid Gender Data")) }

    if (!new Date(DateOfBirth)) {
        return NextResponse.json(ApiResponse(422, "Invalid Date Format Please Provide In (MM/DD/YYYY)"))
    }
    const checkCity = city_data.find((data) => data === City)
    if (!checkCity) { return NextResponse.json(ApiResponse(409, "No City Found")) }

    const validateZipCode = validator.isPostalCode(ZipCode, "IN")
    if (!validateZipCode) {
        return NextResponse.json(ApiResponse(422, "Invalid ZipCode"))
    }

    const validatePassword = validator.isStrongPassword(Password)
    if (!validatePassword) { return NextResponse.json(ApiResponse(422, "Password Must Be Strong With more then 8 character, with alpha numeric capital letter and symbols")) }
    const encrPass = encryptPass(Password)
    try {

        const createUser = await User.create({
            UserName,
            UserEmail,
            DateOfBirth: new Date(DateOfBirth),
            Gender,
            City,
            ZipCode,
            Password: encrPass
        })
        if (!createUser) {
            return NextResponse.json(ApiResponse(500, "Internal Server Error Try After SomeTime"))
        }
        const loginUserCred = await UserLogin.create({
            EmailId: createUser.UserEmail,
            Password: createUser.Password,
            Role: "USER"
        })
        if (!loginUserCred) {
            const removeUser = await User.findOneAndDelete({ UserName: UserName })
            return NextResponse.json(ApiResponse(500, "Internal Server Error Try After SomeTime"))
        }
        const JwtToken = await createToken(loginUserCred.EmailId, loginUserCred.Role)
        return NextResponse.json(ApiResponse(201, "User Registered", { cookie: JwtToken }))
    } catch (error) {
        console.log(error)
        return NextResponse.json(ApiResponse(500, "Error", { error: error }))
    }
}