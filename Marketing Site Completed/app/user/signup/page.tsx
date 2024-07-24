'use client'
import Image from "next/image"
import signUp_image from "../../../public/Sign up-bro.png"
import city_data from "../../Json Data Files/Indian_city.json"
import { useForm } from "react-hook-form"
import validator from "validator"
import style from "../../Css Files/register.module.css"
import Link from "next/link"
import { User_Register_Interface } from "@/app/Interfaces/userForm"
import { ToastContainer, toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
export default function signUp() {
    const router = useRouter()
    const [err, setErr] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    async function handleFormData(userData: any, e: any) {
        e.preventDefault()
        const userObj: User_Register_Interface = {
            UserName: userData.UserName,
            UserEmail: userData.UserEmail,
            DateOfBirth: new Date(userData.DateOfBirth),
            Gender: userData.Gender,
            City: userData.City,
            ZipCode: userData.ZipCode,
            Password: userData.Password
        }
        const sendReq = await fetch("http://localhost:3000/api/user/signup", {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': "Application/json"
            }
        })
        const { statusCode, message, data } = await sendReq.json()
        if (statusCode == 409) {
            setErr(true)
            toast.success(message)
        }
        if (statusCode == 201) {
            alert(message)
            Cookies.set("UserData", data.cookie)
            router.push("/digital-marketing-services")
        }
    }
    function showPass(e: any) {
        const { checked } = e.target
        if (checked) {
            $("#user_password").attr("type", "text")
        }
        else {
            $("#user_password").attr("type", "password")
        }
    }
    return (
        <>
            <div className="container">
                <div className="container">
                    {err ? <ToastContainer /> : <></>}
                    <p className="display-6 text-uppercase text-center " style={{ letterSpacing: "5px" }}>Welcome to "Not Decided..."</p>
                </div>
                <div className="container mt-5 p-2 mb-5" style={{ borderRadius: "20px", boxShadow: "0px 0px 50px 5px" }}>
                    <div className="row">
                        <div className="col-sm-6">
                            <Image
                                src={signUp_image}
                                alt="Signup Bro Image"
                                quality={100}
                                placeholder="blur"
                                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                            />
                        </div>
                        {/* <div className="col-sm-1 vr"></div> */}
                        <div className="col-sm-6">
                            <div className="container">
                                <p className="text-center text-uppercase" style={{ fontSize: "30px", letterSpacing: "5px" }}>Sign Up</p>
                            </div>
                            <div className="container align-self-center">
                                <form onSubmit={handleSubmit((data, e) => handleFormData(data, e))}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="userName" className="form-label">Enter Your UserName</label>
                                        <input type="text" {...register("UserName", { required: true })} id="userName" className="form-control border border-dark " />
                                        {errors.UserName && <span className="text-danger">Please Enter UserName</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="userEmail" className="form-label">Enter Your Email Id</label>
                                        <div className="input-group mt-2">
                                            <input type="text"  {...register("UserEmail", {
                                                required: true,
                                                onChange: (e) => {
                                                    const { value } = e.target
                                                    if (validator.isEmail(value)) {
                                                        $("#userEmail").attr("class", "form-control border border-success border-2")
                                                    }
                                                    else {
                                                        $("#userEmail").attr("class", "form-control border border-danger border-1")
                                                    }
                                                }
                                            })} id="userEmail" className="form-control border border-dark " />
                                            <div className="input-group-prepend">
                                                <div className="input-group-text border border-dark rounded-right">@</div>
                                            </div>
                                        </div>
                                        {errors.UserEmail && <span className="text-danger">Please Enter your EmailId</span>}
                                    </div>
                                    <div className="row mt-3">
                                        <div className="form-group mt-3 col-md-6">
                                            <label htmlFor="dateOfBirth" className="form-label">Select Your Date Of Birth</label>
                                            <input type="date" {...register("DateOfBirth", { required: true })} id="dateOfBirth" className="form-control border border-dark" />
                                            {errors.DateofBirth && <span className="text-danger">Please Select Date Of Birth</span>}
                                        </div>
                                        <div className="col-md-6 mt-3">
                                            <label className="form-label"> Select Gender</label>
                                            <div className="d-flex">
                                                <div className="form-check m-2">
                                                    <input type="radio"  {...register("Gender", { required: true })} value="Male" id="male" className="form-check-input border border-dark" />
                                                    <label htmlFor="male" className="form-check-label">Male</label>
                                                </div>
                                                <div className="form-check m-2">
                                                    <input type="radio"  {...register("Gender", { required: true })} value="Female" id="female" className="form-check-input border border-dark" />
                                                    <label htmlFor="female" className="form-check-label">Female</label>
                                                </div>
                                            </div>
                                            {errors.Gender && <span className="text-danger">Please Select Gender</span>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mt-3 col-md-6">
                                            <label htmlFor="city" className="form-label">Select Your City</label>
                                            <select id="city" className="form-select w-100 border border-dark" {...register("City", { required: true })}>
                                                <option value={""}>- - - - - - - - - - </option>
                                                {
                                                    city_data.map((ele: string) => (
                                                        <option value={ele} key={ele}>{ele}</option>
                                                    ))
                                                }
                                            </select>
                                            {errors.City && <span className="text-danger">Please Select City</span>}
                                        </div>
                                        <div className="form-group mt-3 col-md-6">
                                            <label htmlFor="zipCode" className="form-label">Enter Your Zip Code</label>
                                            <input type="text"  {...register("ZipCode", { required: true, pattern: /[0-9]{6}/ })} id="zipCode" className="form-control border border-dark" minLength={6} maxLength={6} />
                                            {errors.ZipCode && <span className="text-danger">Please Enter ZipCode</span>}
                                        </div>
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="user_password" className="form-label">Enter Your Password</label>
                                        <div className="d-flex">
                                            <input type="password"  {...register("Password", {
                                                required: true,
                                                onChange: (e) => {
                                                    const { value } = e.target
                                                    if (validator.isStrongPassword(value)) {
                                                        $("#user_password").attr("class", "form-control border border-success border-2")
                                                    }
                                                    else {
                                                        $("#user_password").attr("class", "form-control border border-danger border-2")
                                                    }
                                                }
                                            })} id="user_password" className="form-control border border-dark" minLength={8} />
                                            <input type="checkbox" className="form-input-checl border border-dark ml-1" onClick={(e) => showPass(e)} style={{ zoom: "2" }} />
                                        </div>
                                        <small style={{ fontSize: "12px" }}>(Password Must Be Strong With more then 8 character, with alpha numeric capital letter and symbols)</small>
                                        {errors.Password && <span className="text-danger">Please Enter Password</span>}
                                    </div>
                                    <div className="form-group mt-4 d-flex justify-content-center">
                                        <button className="btn btn-primary btn-lg w-75">Register</button>
                                    </div>
                                </form>
                                <div className="d-flex justify-content-center">
                                    Already Register? &nbsp;<p className="text-primary" id={style.signInLink}><Link href={"/user/login"}>Sign In</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}