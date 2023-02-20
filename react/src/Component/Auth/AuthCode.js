import React from 'react'
import ReactInputVerificationCode from 'react-input-verification-code'

const AuthCode = () => {
  return (
    <div style={{"textAlign":"center"}}>
     <h1>Auth Code:</h1>
     <h2>Please Enter here:</h2>
     <div style={{"display":'flex', "justifyContent":"center"}}>
     <ReactInputVerificationCode  />
     </div>
     <div style={{"margin":"2vw", "display":'flex', "justifyContent":"center"}}>
     <button>Authenticate</button>
     </div>
    </div>


  )
}

export default AuthCode