import React from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'
import axios from 'axios'
import { useNavigate } from 'react-router'

const AuthCode = () => {

 const navigate = useNavigate()
  //intergating the g_auth verification here
 function getVerified(e){
 if(!e.includes("-")){
  axios.post("http://167.99.86.45:3000/verify_gauth", {
    email: window.localStorage.getItem("email"),
    code: e
  }).then(response => {
    //storing the auth token into the localstorage
    window.localStorage.setItem('token', response.data.token)
    //navigating to the homepage
    navigate(process.env.PUBLIC_URL + "/")

  })
 }
 }

  return (
    <div style={{ "textAlign": "center" }}>
      <h1>Auth Code:</h1>
      <h2>Please Enter here:</h2>
      <div style={{ "display": 'flex', "justifyContent": "center" }}>
        <ReactInputVerificationCode length={6} placeholder={"-"} onCompleted={(e) => getVerified(e)} />
      </div>
      <div style={{ "margin": "2vw", "display": 'flex', "justifyContent": "center" }}>
        
      </div>
    </div>
  )
}

export default AuthCode