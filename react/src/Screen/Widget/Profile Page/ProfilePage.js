import React from "react";
import PageTitle from "../../../Component/Comman/PageTitle";
import AuthenticationDetail from "../../../Component/WidgetExample/Profile page/AuthenticationDetail";
import PaymentsMethod from "../../../Component/WidgetExample/Profile page/PaymentsMethod";
import Profile from "../../../Component/WidgetExample/Profile page/Profile";
import ProfileSetting from "../../../Component/WidgetExample/Profile page/ProfileSetting";
import axios from "axios"
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Kyc from "../../../Component/WidgetExample/Profile page/Kyc";


function ProfilePage() {

    const [url, setUrl] = useState([])
    const [visible, setVisible] = useState(false)
    const [code, setCode] = useState("")
    const [details, setDetails] = useState([])

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
      })
    }

    //function for fetching the user details 
       //function for the fetching the user data
       const getUserDetails = () => {
        const token = window.localStorage.getItem('token')

        const headers = {
            "x-auth-token": token
        }

        axios.get("http://167.99.86.45:3000/getsingleuser", {headers})
        .then(response=>{
            console.log(response)
            setDetails(response.data)
        }).catch(error=>{
            console.error(error)
        })
    }

    useEffect(()=>{
     getUserDetails()   
    }, [])

    return (<>
        <div className="body-header border-bottom d-flex py-3 mb-3">
            <PageTitle pagetitle='Admin Profile' sidebutton={true} />
        </div>
        <div className="container-xxl">
            <div className='row g-3'>
                <div className='col-xl-4 col-lg-5 col-md-12'>
                    <Profile data={details}/>
                    <PaymentsMethod />
                </div>
                <div className='col-xl-8 col-lg-7 col-md-12'>
                    <ProfileSetting />
                    <AuthenticationDetail />
                    <Kyc />
                    { details.googleauth === null && <button className="col-lg-5 col-md-8 mt-4" onClick={enable_gauth}>Enable 2FA</button>}
                    { !details.googleauth === null && <button className="col-lg-5 col-md-8 mt-4" >Disable 2FA</button>}
                    
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

            </div>
        </div>
    </>
    )
}

export default ProfilePage;