import React from "react";
import { Link } from "react-router-dom";
import AuthRight from "./AuthRight";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";


function Verification() {

    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false)
    const [alert, setAlert] = useState(true)


    //getting the email from localstorage
    const email = window.localStorage.getItem('email')

    //function for submitting the otp api
    function handleSubmit(e) {

        e.preventDefault()
        //getting the email from the localstorage

        const data = {
            "otp": otp,
            "email": email
        }
        // console.log(String(otp.join("")))
        axios.post("http://167.99.86.45:3000/verify_otp", data)
            .then(response => {
                console.log(response.data);
                if (response.data.status === 1) {
                    //store the status in localstorage
                    window.localStorage.setItem('token', response.data.token)
                    //redirecting to the homepage
                    navigate(process.env.PUBLIC_URL + "/")

                } else {
                    setShow(true)
                }

            }).catch(err => {
                console.error(err)
            })

    }

    function handlepata(){
        console.log(otp)
    }
    //function for closing the button
    function handleClose() {
        setShow(false)
    }

    //function for closing the alert
    function handleCloseAlert() {
        setAlert(false)
    }

    return (
        <>
            <div className="body d-flex p-0 p-xl-5">
                <div className="container">
                    <div className="row g-3">
                        {show && <Alert variant='danger'>
                            Invalid Otp!
                            <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                        </Alert>}
                        {email && alert && <Alert variant='success'>
                            Otp sent to your email!
                            <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                        </Alert>}
                        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                            <div className="d-flex flex-column">
                                <h1>Verification</h1>
                                <span className="text-muted">We sent a verification code to your email or phone. <br />Enter the code from the field below.</span>
                                <div className="card mt-4 mb-3" style={{ maxWidth: '20rem' }} >
                                    <div className="card-body p-4">
                                        <form className="row g-1">
                                            <div className="col">
                                                <div className="mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center"
                                                        maxLength="6"
                                                        value={otp}
                                                        onChange={e => setOtp(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                                                <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100" onClick={handleSubmit}>Verify my account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <Link to={process.env.PUBLIC_URL + "#!"} title="#" className="text-primary text-decoration-underline">Resend a new code?</Link>
                            </div>
                        </div>

                        <AuthRight />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification;