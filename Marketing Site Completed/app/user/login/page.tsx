'use client'
import Image from "next/image"
import loginImage from "../../../public/Computer login-rafiki.png"
import style from "../../Css Files/login.module.css"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
export default function Login() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    function showPassword(e: any) {
        const { checked } = e.target
        if (checked) {
            $("#userPassword").attr("type", "text")
        }
        else {
            $("#userPassword").attr("type", "password")
        }
    }
    async function loginFormSubmit(loginData: any) {
        const userData = {
            UserEmail: loginData.UserEmail,
            UserPassword: loginData.UserPassword,
        }

        const sendReq = await fetch("http://localhost:3000/api/user/login", {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const { data, statusCode, message } = await sendReq.json()
        if (statusCode == 422) {
            alert(message)
        }
        else if (statusCode == 404) {
            alert(message)
        }
        else if (statusCode == 409) {
            alert(message)
        }
        else if (statusCode == 200) {
            alert(message)
            Cookies.set("UserData", data.cookie)
            // router.push("/digital-marketing-services")
        }
    }
    return (
        <>
            <div className="container" id="loginPageMainDiv" >
                <div className="container">
                    <p className="display-6 text-uppercase text-center" style={{ letterSpacing: "5px" }}>Login To The QuizNest</p>
                </div>
                <div className="container row border border-dark mt-5" style={{ borderRadius: "20px", boxShadow: "0px 0px 20px 1px" }}>
                    <div className="container col-md-6">
                        <div >
                            <form onSubmit={handleSubmit((data) => loginFormSubmit(data))}>
                                <div className="container mt-5">
                                    <p className="text-uppercase text-center mt-2" style={{ fontSize: "30px", letterSpacing: "4px", fontWeight: "300" }}>Fill all details</p>
                                </div>
                                <div className="container" style={{ marginTop: "15px" }} >

                                    <div className="form-group mt-3">
                                        <label htmlFor="userEmail" style={{ letterSpacing: "2px" }}>Enter EmailId </label>
                                        <input type="text" id="userEmail" {...register("UserEmail", { required: true })} className="form-control border border-dark" />
                                        {errors.UserEmail && <span className="text-danger">Please Enter EmailId</span>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="userPassword" style={{ letterSpacing: "2px" }}>Enter Password</label>
                                        <input type="password" id="userPassword" {...register("UserPassword", { required: true })} className="form-control border border-dark" />
                                        {errors.UserPassword && <span className="text-danger">Please Enter Password</span>}
                                    </div>
                                    <div className="ml-5">
                                        <input type="checkbox" id="showPass" className={`form-check-input border border-dark ${style.showPass}`} onClick={(e) => showPassword(e)} style={{ zoom: "1.5" }} />
                                        <label htmlFor="showPass" className={`form-check-label mt-2 user-select-none ${style.showPass}`} style={{ letterSpacing: "2px" }}>Show Password</label>
                                    </div>
                                </div>
                                <div className="container mt-5">
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-success btn-lg w-50 text-uppercase" style={{ letterSpacing: "3px" }}>Login</button>
                                    </div>
                                    <div className="d-flex text-center mt-4">
                                        <h2 className={style.horizontalLine}><span className={style.orspan}>or</span></h2>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <button className="btn btn-dark btn-lg w-75 text-uppercase" type="button" style={{ letterSpacing: "3px" }} onClick={() => router.push("/user/signup")}>Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="container col-md-6">
                        <Image
                            src={loginImage}
                            alt="Login Image"
                            quality={100}
                            placeholder="blur"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}