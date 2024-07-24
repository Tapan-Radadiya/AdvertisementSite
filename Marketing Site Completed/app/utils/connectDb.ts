import mongoose from "mongoose";

export default async function connectDb() {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/Ecommarce")
        if (!connect.connection.host) {
            return false
        }
        else {
            return true
        }
    } catch (error) {
        console.log("Error Connecting With DB")
        console.log("Error -> ", error)
    }
}