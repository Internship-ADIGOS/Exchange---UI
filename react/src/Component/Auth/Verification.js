import React from "react";
import { Link, Navigate } from "react-router-dom";
import AuthRight from "./AuthRight";
import { useState } from "react";
import { AccordionCollapse } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification() {
     
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const email = window.localStorage.getItem('email')
    
    //api
    const handleChange = (element, index) =>{
      if(isNaN(element.value)) return false;

      setOtp([...otp.map((d, idx)=> (idx === index ? element.value : d ))])

      //focus on the next input 
      if(element.nextSibling){
        element.nextSibling.focus();
      }
    }
    //function for submitting the otp api
    function handleSubmit(e){

        e.preventDefault()
       const headers = {
        "Content-Type":"application/json"
       }
       const data = {
        "otp":otp,
        "email":email
       }
        axios.post("http://167.99.86.45:3000/verify_otp",
         data
        ).then(response => {
        console.log(response);
        //store the status in localstorage
        window.localstorage.setItem("status", response.data.status)
        //redirecting to the homepage
        navigate(process.env.PUBLIC_URL + "/")
          
        })


                


    }
    return (
        <>
            <div className="body d-flex p-0 p-xl-5">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                            <div className="d-flex flex-column">
                                <h1>Verification</h1>
                                <span className="text-muted">We sent a verification code to your email or phone. <br />Enter the code from the field below.</span>
                                <div className="card mt-4 mb-3" style={{ maxWidth: '30rem' }} >
                                    <div className="card-body p-4">
                                        <form className="row g-1">
                                            {otp.map((data, index)=>{
                                                return(
                                                <div className="col">
                                                <div className="mb-2">
                                                <input 
                                                type="text"
                                                className="form-control form-control-lg text-center"
                                                maxLength="1"
                                                key={index}
                                                value={data}
                                                onChange={e => handleChange(e.target, index)}
                                                onFocus={e => e.target.select()}
                                                />
                                                </div>
                                                </div>
                                                )
                                            })}

                                            <div className="col-12 text-center mt-4">
                                                <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100" onClick={handleChange}>Verify my account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <Link to={process.env.PUBLIC_URL+"#!"} title="#" className="text-primary text-decoration-underline">Resend a new code?</Link>
                            </div>
                        </div>

                        <AuthRight/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification;