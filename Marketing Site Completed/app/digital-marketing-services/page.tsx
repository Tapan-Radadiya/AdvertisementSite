'use client'
import Image from "next/image"
import carousel_1 from "../../public/DashboardImages/login_carousel.png"
import carousel_2 from "../../public/DashboardImages/prof_register.png"
import cheatExamOver from "../../public/DashboardImages/chaetExamOver.png"
import manageExams_img from "../../public/DashboardImages/manageExams.png"
import userReview_img from "../../public/DashboardImages/reviewUser.png"
import style from "../Css Files/dashboard.module.css"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import validator from "validator"
import { ToastContainer, toast } from "react-toastify"
import { ContactUs_interface } from "../Interfaces/contactUs"
import { userReview_Interface } from "../Interfaces/userReview"
import { log } from "console"

type reviewData_type = {
    FullName: string
    Message: string
    createdAt: Date
}
export default function DigitalMarketingSite() {
    const router = useRouter()
    const [messageLength, setMessageLength] = useState(0)
    let [reviewData, setReviewData] = useState<any>([])
    const dataLength = reviewData.length
    const { register: firstFormRegister, formState: { errors: firstFormErrors }, handleSubmit: firstFormSubmit } = useForm()
    const { register: secondFormRegister, formState: { errors: secondFormErros }, handleSubmit: secondFormSubmit } = useForm()
    const [reviewLength, setReviewLength] = useState(0)
    const [features, setFeatures] = useState([])
    const [userLogin, setUserLogin] = useState(false)
    useEffect(() => {
        validateUser()
        fetchReviewData()
        fetchFeaturesData()
    }, [])

    function validateUser() {
        const user = Cookies.get("UserData")
    }
    async function fetchReviewData() {
        const apiData = await fetch("http://localhost:3000/api/user/getReview", {
            method: "GET"
        })
        const { statusCode, data } = await apiData.json()
        if (statusCode == 200) {
            const tempArr: any = []
            data.forEach((ele: any) => {
                const obj: reviewData_type = {
                    FullName: ele.FullName,
                    Message: ele.Message,
                    createdAt: ele.createdAt
                }
                tempArr.push(obj)
            })
            setReviewData(tempArr)
        }
    }
    async function fetchFeaturesData() {
        const apiData = await fetch("http://localhost:3000/api/user/getAllFeatures", {
            method: "GET"
        })
        const { statusCode, data } = await apiData.json()
        if (statusCode == 200) {
            setFeatures(data)
        }
        else {
            console.log("Error Fetching New Features")
        }
    }
    async function submitContactData(data: any) {
        const obj: ContactUs_interface = {
            FullName: data.FullName,
            Email: data.Email,
            Message: data.Message
        }
        const sendReq = await fetch("http://localhost:3000/api/user/contactUs", {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { statusCode, message } = await sendReq.json()
        if (statusCode == 201) {
            toast.success(message, { style: { color: "green" } })
            // alert(message)
            location.reload()
        }
        else {
            toast(message)
        }
    }

    function nextReview() {
        if (reviewLength == dataLength - 1) {
            setReviewLength(0)
        }
        else {
            setReviewLength((reviewLength) => reviewLength + 1)
        }
    }
    function prevReview() {
        if (reviewLength == 0) {
            setReviewLength(dataLength - 1)
        }
        else {
            setReviewLength((reviewLength) => reviewLength - 1)
        }
    }

    async function userReview(data: any) {
        const obj: userReview_Interface = {
            FullName: data.UserName,
            Message: data.Review_Message
        }
        const sendReq = await fetch("http://localhost:3000/api/user/review", {
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const { statusCode, message } = await sendReq.json()
        if (statusCode == 201) {
            alert(message)
            location.reload()
        }
        else {
            alert(message)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="modal fade" id="contactUsModal">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="dialog">
                    <div className="modal-content p-2" id="contactForm">
                        <div className="modal-header">
                            <h3 className="modal-title text-uppercase" style={{ letterSpacing: "2px" }}>Contact Us</h3>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid border border-dark p-3" id="contactForm" style={{ borderRadius: "20px" }}>
                                <form onSubmit={firstFormSubmit((data: any) => submitContactData(data))}>
                                    <div className="container row mt-2">
                                        <div className="form-group">
                                            <label htmlFor="fullName" className="form-label" style={{ letterSpacing: "3px" }}>Enter Full Name</label>
                                            <input type="text" {...firstFormRegister("FullName", { required: true })} id="fullName" className="form-control border border-dark" />
                                            {firstFormErrors.FullName && <span className="text-danger">Full Name Required</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fullName" className="form-label" style={{ letterSpacing: "3px" }}>Enter Your Email</label>
                                            <input type="text" {...firstFormRegister("Email", {
                                                required: true,
                                                onChange: (e) => {
                                                    const { value } = e.target
                                                    if (validator.isEmail(value)) {
                                                        $("#userEmail").attr("class", "form-control border border-success border-2")
                                                    }
                                                    else {
                                                        $("#userEmail").attr("class", "form-control border border-danger border-2")
                                                    }
                                                }
                                            })} id="userEmail" className="form-control border border-dark" />
                                            {firstFormErrors.Email && <span className="text-danger">Email id Required</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Message" className="form-label" style={{ letterSpacing: "3px" }}>Enter Message</label>
                                            <input type="text" {...firstFormRegister("Message", { required: true })} id="message" className="form-control border border-dark" />
                                            {firstFormErrors.Message && <span className="text-danger">Message Required</span>}
                                        </div>
                                        <div className="form-group d-flex justify-content-center mt-4">
                                            <button className="btn text-uppercase btn-primary w-50 btn-lg" style={{ letterSpacing: "2px" }}  >Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="container-fluid" id="homeDiv">
                <div className="mt-3 container-fluid w-100 p-5" style={{ height: "450px" }}>
                    <p className="display-1 text-center mt-5" style={{ margin: "auto" }}>Welcome To <span className="text-dark" id="companyName"> Quiz<input type="radio" style={{ zoom: "3.5" }} onClick={() => $("#companyName").attr("class", "text-primary")}></input>Nest</span></p>
                    <div className="container">
                        <p style={{ textWrap: "inherit", fontSize: "20px" }} className="text-center mt-5 lead">
                            your all-in-one platform for creating and taking <span className="text-primary"> multiple-choice exams!</span> Professors can effortlessly design custom quizzes, while students access them using <span className="text-primary"> unique exam codes. </span> Dive into a seamless learning experience with QuizNest.
                        </p>
                    </div>
                </div>
                <hr style={{ marginLeft: "100px", marginRight: "100px" }} />
                <div className="container-fluid mt-5 mb-5 p-5">
                    <div className="carousel slide" id="carouselImages" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Image
                                    src={carousel_1}
                                    alt="Carouse First image"
                                    className="d-block w-100 img-fluid"
                                    // style={{ height: "10", width: "50" }}
                                    placeholder="blur"
                                />
                                <div className="carousel-caption d-none d-md-block" >
                                    <h4 className="text-light">Interactive Login Page</h4>
                                    <p>Simple Login Page With Which You Can Login From Any Device</p>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <Image
                                    src={carousel_2}
                                    alt="Carouse First image"
                                    className="d-block w-100 img-fluid"
                                    // style={{ height: "10", width: "50" }}
                                    placeholder="blur"
                                />
                                <div className="carousel-caption d-none d-md-block" >
                                    <h4 className="text-light">Interactive Register Page For Professor</h4>
                                    <p>Simple Register Page With Which You Can Register From Any Device</p>
                                </div>
                            </div>

                        </div>
                        <a href="#carouselImages" className="carousel-control-prev" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden={"true"}></span>
                            <span>Previous</span>
                        </a>
                        <a href="#carouselImages" className="carousel-control-next" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden={"true"}></span>
                            <span>Next</span>
                        </a>
                    </div>
                </div>

                <div className="container-fluid bg-primary p-5 row" style={{ letterSpacing: "5px" }}>
                    <div className="container p-5 col-md" style={{ borderRight: "1px solid black" }}>
                        <div className="">
                            <div className="row">
                                {/* <div className="col-md-6"><i className="fa fa-circle-info"></i>Helo</div> */}
                                <div className="col-md-6 w-100"><p className="text-light w-100" style={{ fontSize: "50px" }}>Reduce Physical Paper Overhead</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="container p-5 col-md" style={{ borderRight: "1px solid black" }}>
                        <div className="">
                            <div className="row">
                                {/* <div className="col-md-6"><i className="fa fa-circle-info"></i>Helo</div> */}
                                <div className="col-md-6 w-100"><p className="text-light w-100" style={{ fontSize: "50px" }}>Provide Instant Result</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="container p-5 col-md">
                        <div className="">
                            <div className="row">
                                {/* <div className="col-md-6"><i className="fa fa-circle-info"></i>Helo</div> */}
                                <div className="col-md-6 w-100"><p className="text-light w-100" style={{ fontSize: "50px" }}>Direct Modification Of MCQ</p></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container mt-5" id="featureDiv">
                    <p className="display-6 text-center text-uppercase" style={{ marginTop: "100px", letterSpacing: "5px" }}>Features</p>
                </div>
                <div className="container-fluid p-5 row d-flex justify-content-center">
                    {
                        features.map((key: any, value: any) => (
                            <div className={`card col-md-3 p-4 m-3 ${style.featureBox}`} key={value}>
                                <img className="card-img-top"></img>
                                <div className="card-body">
                                    <h2 className="card-title">{key.Title}</h2>
                                    <p style={{ fontSize: "20px" }} className="card-text mt-4">{key.Feature_Detail}</p>
                                    {/* <button className="btn btn-primary">View More</button> */}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="container-fluid mb-5" id="liveDemoDiv">
                    <div className="container">
                        <div className="p-5">
                            <div className="text-left mt-5 text-center">
                                <h1 className="text-primary">Live Demo</h1>
                                <p style={{ letterSpacing: "5px", fontSize: "20px" }}>Here Is Live Demo Of <br /> How Student Can Give Exam</p>
                            </div>
                            <div className="container-fluid embed-responsive embed-responsive-16by9 border border-dark " style={{ padding: "28px", borderRadius: "20px" }}>
                                <video className={`embed-responsive-item ${style.videoDiv}`} width={"100"} height={"100"} autoPlay controls muted>
                                    <source src="/DashboardImages/examPortalExam_start.webm" type="video/webm" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="container mt-5">
                    <p className="display-6 text-center" style={{ letterSpacing: "3px" }}>Student Can't Cheat In Exam</p>
                </div>
                <div className={`container mt-5 mb-5 border border-dark ${style.cheatExamDiv}`} style={{ borderRadius: "20px" }}>
                    <div className="container row">
                        <div className="col-md p-5 ">
                            <h1 className="text-primary" style={{ letterSpacing: "3px" }}>Proctored Examination</h1>
                            <p className="mt-3 text-capitalize" style={{ letterSpacing: "2px", wordSpacing: "3px", fontSize: "20px" }}> Student Can't Able To  Cheat <br />If Student Try to <span className="text-danger"> Change Tab </span> While Giving Exam Studnet Will Get <span className="text-danger"> Warning for 3 times </span> then exam will auto submit <br /> As Per Displayed In image.</p>
                        </div>
                        <div className="container col-md-7 p-5 ">
                            <Image
                                loading="lazy"
                                src={cheatExamOver}
                                alt="Exam Over After Cheating"
                                sizes="100vw"
                                style={{ width: "100%", height: "80%" }}
                                placeholder="blur"
                            />
                        </div>
                    </div>
                </div>
                <div className="container " style={{ marginTop: "80px" }}>
                    <p className="display-6 text-center" style={{ letterSpacing: "3px" }}>Professor Can Manage Exams</p>
                </div>
                <div className={`container mt-5 mb-5 border border-dark p-5 ${style.manageExamsDiv}`} style={{ borderRadius: "20px" }}>
                    <div className="container row">
                        <div className="col-md-6">
                            <Image
                                loading="lazy"
                                src={manageExams_img}
                                alt="Manage Exam Image"
                                sizes="100vw"
                                placeholder="blur"
                                style={{ height: "100%", width: "100%" }}
                            />
                        </div>
                        <div className="col-md">
                            <h1 className="text-primary ml-5">Professor Manage Exams</h1>
                            <p className="ml-5" style={{ fontSize: "20px", letterSpacing: "2px", wordSpacing: "3px" }}>Professor can <span className="text-primary"> see all the exam </span> and also able to <span className="text-primary"> change exam status </span>to show and hide. <br />
                                while deleting exam only professor <span className="text-danger">who created exam can delete the exam.</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container" id="userReviewDiv" style={{ marginTop: "80px" }}>
                    <p className="display-6 text-center" style={{ letterSpacing: "3px" }}>Reviews From User</p>
                </div>
                <div className="bg-success container-fluid mt-5 mb-5 p-5 carousel slide" id="userReviewCarousel" >
                    <div className={`container bg-light carousel-inner ${style.userReviewDiv}`} style={{ borderRadius: "20px" }}>
                        {
                            reviewData.length != 0 ?
                                <div className="carousel-item active p-5">
                                    <figure className="text-end p-3 ">
                                        <blockquote className="blockquote">
                                            <p>
                                                {reviewData[reviewLength].Message}
                                            </p>
                                        </blockquote>
                                        <figcaption className="blockquote-footer ">
                                            {reviewData[reviewLength].FullName}
                                        </figcaption>
                                    </figure>
                                </div> : <></>
                        }
                    </div>
                    <a href="#userReviewCarousel" className="carousel-control-prev" role="button" data-slide="prev" onClick={() => prevReview()}>
                        <span className="carousel-control-prev-icon" style={{ color: "black" }}></span>
                        <span className="sr-only text-dark">Previous</span>
                    </a>
                    <a href="#userReviewCarousel" className="carousel-control-next" role="button" data-slide="next" onClick={() => nextReview()}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only text-dark">Next</span>
                    </a>
                </div>
                <div className="container mt-5 mb-2 p-4">
                    <p className="display-6 text-center mt-5">Already Using <span className="">Quiz</span>Nest? Please Give Review</p>
                </div>
                <div className="container p-3">
                    <div className="container row  p-3">
                        <div className="container col-md-6 p-1">
                            <Image
                                src={userReview_img}
                                alt="User Review image"
                                placeholder="blur"
                                quality={100}
                                style={{ height: "100%", width: "100%" }}
                            />
                        </div>
                        <div className="col-md-6 p-4 bg-success" style={{ borderRadius: "20px" }}>
                            <div className="container  ">
                                <div className="text-center p-2">
                                    <p style={{ fontSize: "30px", letterSpacing: "2px", marginTop: "70px" }} className="text-white text-uppercase">Fill All Details</p>
                                </div>
                                <div className="container">
                                    <form onSubmit={secondFormSubmit((data) => userReview(data))}>
                                        <div className="form-group mt-2">
                                            <label htmlFor="userName" className="form-label text-white" style={{ letterSpacing: "2px" }}>Enter Your Name</label>
                                            <input type="text" {...secondFormRegister("UserName", { required: true })} id="userName" className="form-control border border-dark" />
                                            {secondFormErros.UserName && <span style={{ color: "#ff9999" }}>Please Enter Your Name</span>}
                                        </div>
                                        <div className="form-group mt-4">
                                            <label htmlFor="review_message" className="form-label text-white" style={{ letterSpacing: "2px" }}>Enter Your Review</label>
                                            <span className="float-right text-white" id="reviewLength">{messageLength}/200</span>
                                            <textarea {...secondFormRegister("Review_Message", {
                                                required: true,
                                                onChange: (e) => {
                                                    const { value } = e.target
                                                    setMessageLength(value.length)
                                                }
                                            })} id="review_message" className="form-control border border-dark" minLength={5} maxLength={200} rows={5} />
                                            {secondFormErros.Review_Message && <span style={{ color: "#ff9999" }}>Please Provide Review</span>}
                                        </div>
                                        <div className="form-group mt-5 d-flex justify-content-center">
                                            <button type="submit" className="btn btn-dark btn-lg w-50">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center" style={{ marginTop: "60px" }}>
                    <h2 className={`${style.horizontalLine}`}><span>or</span></h2>
                </div>
                <div className="container p-2 mb-4" id="exploreDiv" style={{ marginTop: "70px" }}>
                    <p className="display-6 text-center">Explore <span className="text-primary"> QuizNest </span> Now</p>
                </div>
                {/* <div className="container d-flex justify-content-center mb-5">
                    <button className={`btn btn-outline-primary btn-lg w-50 text-center text-uppercase ${style.visitBtn}`} style={{ borderRadius: "20px" }}>Visit QuizNest</button>
                </div> */}

                <div className="container border border-dark p-4" style={{ borderRadius: "20px", boxShadow: "0px 0px 50px 10px gray" }}>
                    <div className="container row">
                        <div className="col-md p-3 m-3 text-center">
                            <p className="display-6 mt-4 p-3">Start Exploring QuizNest</p>
                            <button className={` mt-5 btn btn-outline-primary w-50 btn-lg text-center align-self-center`}>Visit QuizNest</button>
                        </div>
                        {/* <div className="col-md-1 text-center mt-2 mb-2"><div className="vr" style={{ color: "black", height: "300px", width: "2px" }}></div></div> */}
                        <div className="col-md text-center p-3 m-3">
                            <p className="display-6 mt-4 p-3 ">Contact For More Details</p>
                            <button className={` mt-5 btn btn-outline-success w-50 btn-lg text-center align-self-center`} data-toggle="modal" data-target="#contactUsModal">Contact Us</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}