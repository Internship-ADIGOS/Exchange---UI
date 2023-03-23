import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';


const GoogleAuth = ({data}) => {

      const [url, setUrl] = useState([])
      const [code, setCode] = useState("")
      const [visible, setVisible] = useState(false)
      const [show, setShow] = useState(false)
      

     //function after onClick the button
    function enable_gauth() {
      setVisible(true);
      axios.post("http://167.99.86.45:3000/signup_gauth", {
          email: window.localStorage.getItem("email")
      }).then(response => {
          setUrl(response.data.qr)
      })
  }
  
  //function for verifying the gauth code
  function verify_gauth(){
      axios.post("http://167.99.86.45:3000/verify_gauth", {
          email: window.localStorage.getItem("email"),
          code: code
      }).then(response => {
          //storing the auth token into the localstorage
         window.localStorage.setItem('token', response.data.token)

         window.location.reload()
    })
  }

  //function for disabling the gauth
  function disable_gauth(){
    const headers = {
      "x-auth-token": window.localStorage.getItem("token")
    }
    axios.post("http://167.99.86.45:3000/disable_gauth", {headers}).then(response => {
      console.log(response.data)
      setShow(true)
    })
  }

  function handleClose(){
      setShow(false)
  }

  return (
    <div>
    {show && <Alert variant='success'>
                        Google 2 factor Authentication removed!
                        <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                    </Alert>}
                  {data.googleauth === undefined && <Button className="col-lg-5 col-md-8 mt-4" onClick={enable_gauth}>Enable 2FA</Button>}
                  {!(data.googleauth === undefined) && <Button className="col-lg-5 col-md-8 mt-4" onClick={disable_gauth} >Disable 2FA</Button>}
                                  
                    <Modal show={visible} onHide={() => { setVisible(false) }}>
                        <Modal.Header>
                            <h5 className="modal-title" id="exampleModalLiveLabel">Google Two Factor Authentication</h5>
                            <button type="button" className="btn-close" onClick={() => { setVisible(false) }}></button>
                        </Modal.Header>
                        <Modal.Body className=""> 
                            <div style={{"display":"flex", "justifyContent":"center"}}>
                            <img src={url} />
                            </div>
                            <br />
                            <div style={{"display":"flex", "justifyContent":"center"}} className="mt-2">
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                            <Button onClick={verify_gauth}>Verify</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
    </div>
  )
}

export default GoogleAuth