import React from 'react'
import SliderCaptcha from "@slider-captcha/react"

const CapcthaSlider = () => {

    function verificationCallback(token){
        console.log('Captcha token: ' + token)
    }
  return (
    <div>
         <SliderCaptcha 
          create={"https://bullionsx.com/bullionsx-logo.png"}
          verify={}
          callback={verificationCallback}
         />
    </div>
  )
}

export default CapcthaSlider