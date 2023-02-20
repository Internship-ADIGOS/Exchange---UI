import React from 'react'
import SlideCaptcha from "react-slide-captcha"
import 'react-slide-captcha/dist/styles.css'


const CapcthaSlider = () => {
  return (
    <div>
      <h1>CapcthaSlider</h1>
      <SlideCaptcha 
      puzzleUrl={"https://bullionsx.com/bullionsx-logo.png"}
      bgUrl={"https://bullionsx.com/bullionsx-logo.png"}
      onRequest={this.resultCallback}
      containerClassName="test"
      />
    </div>
  )
}

export default CapcthaSlider