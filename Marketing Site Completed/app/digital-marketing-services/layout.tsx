'use client'
import style from "../Css Files/headerFooter.module.css"
export default function Header({ children }: any) {
    function changeTheme() {
        const curTheme = $("#mainDivOfSite").attr("class")
        if (curTheme == "") {
            $("#mainDivOfSite").attr("class", "bg-dark")
        }
        else { $("#mainDivOfSite").attr("class", "") }
    }
    return (
        <>
            <div className="" id="mainDivOfSite">
                <header>
                    <div className="container-fluid position-sticky sticky-xl-top p-4 text-white">
                        <div className="container-fluid row p-2 border border-dark text-center" style={{ borderRadius: "20px" }}>
                            <div className="col-md-2 mt-3">
                                <p style={{ fontSize: "25px" }}>
                                    <span className="text-dark">Quiz</span><input type="radio" defaultChecked style={{ zoom: "1.2" }} /><span className="text-primary">Nest </span></p>
                            </div>
                            <div className="mt-3 col-md"><a href="#featureDiv" style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > Features</a></div>

                            <div className="mt-3 col-md"><a href="#liveDemoDiv" style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > Live Demo <i className="fa fa-tv"></i></a></div>

                            <div className="mt-3 col-md"><a href="#userReviewDiv" style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > User Review <i className="fa fa-star"></i></a></div>

                            <div className="mt-3 col-md"><a href="#exploreDiv" style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > Explore <i className="fa fa-earth-americas"></i></a></div>

                            <div className="mt-3 col-md"><a href="#featureDiv" style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > ContactUs <i className="fa fa-phone"></i></a></div>

                            <div className="mt-3 col-md">
                                <p onClick={() => changeTheme()} style={{ fontSize: "20px" }} className={`${style.headerLinkDiv}`}>
                                    <i className="fa fa-sun-o" id="subIcon"></i><i className="fa fa-moon-o" id="moonIcon" style={{ display: "none" }}></i> Theme
                                </p>
                            </div>
                            <div className="mt-3 col-md"><a style={{ fontSize: "20px" }} className={`${style.headerLinkDiv} text-dark`} > Welcome,(Tapan) &nbsp;<i className="fa fa-user"></i></a></div>
                        </div>
                    </div>
                </header>

                <section>{children}</section>

                <div className="container-fluid bg-dark p-5" style={{marginTop:"100px"}}>
                    <div className="row border border-dark p-2">
                        <p className="display-6 text-white col-md-2">Quiz<input type="radio" defaultChecked style={{ zoom: "2" }} />Nest</p>
                        <div className="col-md-2 row text-center">
                            <div className="col-md">
                                <div className="mt-3"><a href="#featureDiv" style={{ fontSize: "20px" }} className={`${style.footerNavLinks} text-white`} > Features</a></div>
                                <div className="mt-5 "><a href="#liveDemoDiv" style={{ fontSize: "20px" }} className={`${style.footerNavLinks} text-white`} > Live Demo <i className="fa fa-tv"></i></a></div>
                                <div className="mt-5 col-md "><a href="#userReviewDiv" style={{ fontSize: "20px" }} className={`${style.footerNavLinks} text-white`} > User Review <i className="fa fa-star"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md-2 row text-center">
                            <div className="col-md">
                                <div className="mt-3 col-md "><a href="#exploreDiv" style={{ fontSize: "20px" }} className={`${style.footerNavLinks} text-white`} > Explore <i className="fa fa-earth-americas"></i></a></div>
                                <div className="mt-5 col-md "><a href="#exploreDiv" style={{ fontSize: "20px" }} className={`${style.footerNavLinks} text-white`} > ContactUs <i className="fa fa-phone"></i></a></div>
                            </div>
                        </div>
                        <div className="col-md m-4"></div>
                        <div className="col-md-5 mt-1 p-5">
                            <div className="container text-light">
                                <p className="h4">Subscribe To Our NewsLetter</p>
                                <p className="h4 mt-2">Get Latest News About The Product</p>
                                <div className="d-flex mt-4">
                                    <input type="text" id="" className="form-control w-50 mr-3" placeholder="john@doe" />
                                    <button className="btn btn-primary">Subscribe</button>
                                </div>
                                <div className="d-flex mt-4 row">
                                    <p className={`text-center col-md-3 ${style.socialLinksFooter}`} style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px" }}><i className="fa fa-brands fa-github mr-2"></i>Github</p>
                                    <p className={`text-center col-md-2 ${style.socialLinksFooter}`} style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px" }}><i className="fa fa-brands fa-square-x-twitter"></i>Twitter</p>
                                    <p className={`text-center col-md-4 ${style.socialLinksFooter}`} style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px" }}><i className="fa fa-brands fa-instagram mr-2"></i>Instagram</p>
                                    <p className={`text-center col-md-3 ${style.socialLinksFooter}`} style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px" }}><i className="fa fa-brands fa-facebook mr-2" style={{ color: "#007bff;" }}></i>FaceBook</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center text-light p-5 mt-4">
                        <i className="fa fa-regular fa-copyright"></i> All Rights Reserved {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </>
    )
} 