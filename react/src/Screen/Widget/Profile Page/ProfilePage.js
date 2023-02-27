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
import SideNavBar from "../../../Component/WidgetExample/Profile page/SideNavBar";
import GoogleAuth from "../../../Component/WidgetExample/Profile page/GoogleAuth";
import BankDetail from "../../../Component/WidgetExample/Profile page/BankDetails";


function ProfilePage() {

    const [firststep, setFirststep] = useState(false);
    const [secondstep, setSecondstep] = useState(false);
    const [thirdstep, setThirdstep] = useState(false);
    const [fourthstep, setFourthstep] = useState(false);
    const [fifthstep, setFifthstep] = useState(false);
    const [sixstep, setSixthstep] = useState(false);
    const [sevenstep, setSevenStep] = useState(false);

    const [details, setDetails] = useState([])

 

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
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Form Wizard Vertical</h5>
                </div>
                <div className="card-body">
                    <div className="wizard-main" id="w-vertical">
                        <div className="step-app">
                            <ul className="step-steps">
                                <li data-step-target="step1" className={`${firststep?"active":""}`} onClick={() => { setFirststep(true); setSecondstep(false); setThirdstep(false); setFourthstep(false); setFifthstep(false); setSixthstep(false) }}><span>1</span> User Information</li>
                                <li data-step-target="step2" className={`${secondstep?"active":""}`}  onClick={() => { setFirststep(false); setSecondstep(true); setThirdstep(false); setFourthstep(false); setFifthstep(false); setSixthstep(false) }}><span>2</span> Payments Method</li>
                                <li data-step-target="step3" className={`${thirdstep?"active":""}`} onClick={() => { setFirststep(false); setSecondstep(false); setThirdstep(true); setFourthstep(false); setFifthstep(false) }}><span>3</span> Profile Setting</li>
                                <li data-step-target="step4" className={`${fourthstep?"active":""}`}  onClick={() => { setFirststep(false); setSecondstep(false); setThirdstep(false); setFourthstep(true); setFifthstep(false); setSixthstep(false) }}><span>2</span> Change Password</li>
                                <li data-step-target="step5" className={`${fifthstep?"active":""}`}  onClick={() => { setFirststep(false); setSecondstep(false); setThirdstep(false); setFourthstep(false); setFifthstep(true); setSixthstep(false) }}><span>2</span> Kyc verification</li>
                                <li data-step-target="step6" className={`${sixstep?"active":""}`}  onClick={() => { setFirststep(false); setSecondstep(false); setThirdstep(false); setFourthstep(false); setFifthstep(false); setSixthstep(true) }}><span>2</span> Google 2fa</li>
                                <li data-step-target="step7" className={`${sevenstep?"active":""}`}  onClick={() => { setFirststep(false); setSecondstep(false); setThirdstep(false); setFourthstep(false); setFifthstep(false); setSixthstep(false); setSevenStep(true) }}><span>2</span> Bank verification</li>
                            </ul>
                            <div className="step-content">
                                <div className={`step-tab-panel active ${firststep ? "" : "d-none"}`} data-step="step1">
                                    <Profile data={details} />
                                </div>
                                <div className={`step-tab-panel ${secondstep ? "" : "d-none"}`} data-step="step2">
                                    <PaymentsMethod />
                                </div>
                                <div className={`step-tab-panel ${thirdstep ? "" : "d-none"}`} data-step="step3">
                                    <ProfileSetting />
                                </div>
                                <div className={`step-tab-panel ${fourthstep ? "" : "d-none"}`} data-step="step4">
                                   <AuthenticationDetail />
                                </div>
                                <div className={`step-tab-panel ${fifthstep ? "" : "d-none"}`} data-step="step5">
                                    <Kyc />
                                </div>
                                <div className={`step-tab-panel ${sixstep ? "" : "d-none"}`} data-step="step6">
                                    <GoogleAuth data={details}/>
                                </div>
                                <div className={`step-tab-panel ${sevenstep ? "" : "d-none"}`} data-step="step7`">
                                    <BankDetail />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="container-xxl">
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
        </div> */}
    </>
    )
}

export default ProfilePage;

