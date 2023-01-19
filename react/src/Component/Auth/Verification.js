import React from "react";
import { Link, Navigate } from "react-router-dom";
import AuthRight from "./AuthRight";
import { useState } from "react";
import { AccordionCollapse } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Verification() {

    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill("-"));
    const [show, setShow] = useState(false)

    
    //api
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

        //focus on the next input 
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    }
    //function for submitting the otp api
    function handleSubmit(e) {
        
        e.preventDefault()
        //getting the email from the localstorage
        const email = window.localStorage.getItem('email')
       
        const data = {
            "otp": String(otp.join("")),
            "email": email
        }
        // console.log(String(otp.join("")))
        axios.post("http://167.99.86.45:3000/verify_otp", data)
        .then(response => {
            console.log(response.data);
            if(response.data.status === 1){
                //store the status in localstorage
                window.localStorage.setItem('token', response.data.token)
                //redirecting to the homepage
                navigate(process.env.PUBLIC_URL + "/")

            }else{
                setShow(true)
            }

        }).catch(err => {
            console.error(err)
        })

    }

    //function for closing the button
    function handleClose(){
        setShow(false)
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
                        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                            <div className="d-flex flex-column">
                                <h1>Verification</h1>
                                <span className="text-muted">We sent a verification code to your email or phone. <br />Enter the code from the field below.</span>
                                <div className="card mt-4 mb-3" style={{ maxWidth: '30rem' }} >
                                    <div className="card-body p-4">
                                        <form className="row g-1">
                                            {otp.map((otp, index) => {
                                                return (
                                                    <div className="col" key={index}>
                                                        <div className="mb-2" key={index}>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg text-center"
                                                                maxLength="1"
                                                                key={index}
                                                                value={otp}
                                                                onChange={e => handleChange(e.target, index)}
                                                                onFocus={e => e.target.select()}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}

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