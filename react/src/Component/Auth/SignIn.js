import axios from "axios";
import { React, useState, useEffect } from "react";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthRight from "./AuthRight";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { Vertify } from "@alex_xu/react-slider-vertify";
import Modal from "react-bootstrap/Modal"



function Signin() {

    const navigate = useNavigate();

    // initial state
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [showLog, setShowLog] = useState(false)
    const [visible, setVisible] = useState(false)
    const [showstatus, setShowStatus] = useState(true)
    const [msg, setMsg] = useState([])
    
    //fetch the status from the localstorage
    const status = window.localStorage.getItem("status")

    //function  to close the alert
    function handleClose() {
        setShow(false)
    }
    //function for showing the captcha 
    function handleCaptcha(e) {
        e.preventDefault()
        setVisible(!visible)
    }
    //function to close the log alert 
    function handleLog() {
        setShowLog(false)
    }

    function handleCloseStatus(){
        window.localStorage.removeItem("status")
        setShowStatus(false)
    }

    //function for login
    const handleLogin = () => {

        const data = {
            email: email,
            password: password
        }

        axios.post("http://167.99.86.45:3000/login", data).then(response => {
            console.log(response.data)

            //store the email to the local storage 
            window.localStorage.setItem("email", email)
            if(response.data.status === 1){
                if(response.data.emailstatus === 1){
                    navigate(process.env.PUBLIC_URL + "/verification")
                }else{
                    navigate(process.env.PUBLIC_URL + "/authcode")
                }
            }else{
                console.log(response.data.message)
                setMsg(response.data.message)
                setShow(true)
            }
        }).catch(err => {
            console.error(err)
            setShow(true)
        })
    }

    return (
    <>
        <div className="body d-flex p-0 p-xl-5">
            <div className="container">
                <div className="row g-3">

                    {show && <Alert variant='danger'>
                        {msg}
                        <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                    </Alert>}
                    {/* {show && <Alert variant='danger'>
                        {data.message}
                        <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                    </Alert>} */}
                    {showLog && <Alert variant='success'>
                        Succesfully Logged Out!
                        <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleLog}></button>
                    </Alert>}

                    {status && showstatus && <Alert variant='success'>
                        Account Created Successfully. Activation link send your Email address
                        <button style={{ float: 'right' }} type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={handleCloseStatus}></button>
                    </Alert>}

                    <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                        <div className="d-flex flex-column">
                            <h1>Account Login</h1>
                            <span className="text-muted">Welcome back! Log In with your Email, Phone number or QR code</span>
                            <Tab.Container defaultActiveKey="first">
                                <Nav className="nav nav-pills mt-4" role="tablist" defaultActiveKey="first">
                                    <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="first">Email</Nav.Link></Nav.Item>
                                    <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="second">Mobile</Nav.Link></Nav.Item>
                                </Nav>
                                <Tab.Content className="tab-content mt-4 mb-3" >
                                    <Tab.Pane className="tab-pane fade " id="Email" eventKey="first">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <form onSubmit={(e) => { handleCaptcha(e) }}>
                                                    <div className="mb-3">
                                                        <label className="form-label fs-6">Email address</label>
                                                        <input type="email" className="form-control"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label fs-6">Password</label>
                                                        <input type="password" className="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                                                        data-toggle="modal" data-target="#exampleModalLive"
                                                    >log in</button>
                                                    <Modal show={visible} onHide={() => { setVisible(false) }}>
                                                        <Modal.Header>
                                                            <h5 className="modal-title" id="exampleModalLiveLabel">Modal title</h5>
                                                            <button type="button" className="btn-close" onClick={() => { setVisible(false) }}  ></button>
                                                        </Modal.Header>

                                                        <Modal.Body>
                                                            <Vertify
                                                                width={320}
                                                                height={160}
                                                                visible={visible}
                                                                onSuccess={() => handleLogin()}
                                                                onFail={() => window.location.reload()}
                                                            />
                                                        </Modal.Body>
                                                    </Modal>
                                                </form>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane className="tab-pane fade" id="Mobile" eventKey="second">
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <form>
                                                    <label className="form-label fs-6">Mobile</label>
                                                    <Dropdown as='a' className="input-group mb-3">
                                                        <Dropdown.Toggle className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91 India</Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu">
                                                            <li><Dropdown.Item className="dropdown-item" href="#!">+376 Andora</Dropdown.Item></li>
                                                            <li><Dropdown.Item className="dropdown-item" href="#!">+61 Australia</Dropdown.Item></li>
                                                            <li><Dropdown.Item className="dropdown-item" href="#!">+55 Brazil</Dropdown.Item></li>
                                                        </Dropdown.Menu>
                                                        <input type="text" className="form-control" />
                                                    </Dropdown>
                                                    <div className="mb-3">
                                                        <label className="form-label fs-6">Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2">log in</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                            <Link to={process.env.PUBLIC_URL + "/forgot-password"} title="#" className="text-primary text-decoration-underline">Forgot password?</Link>
                            <Link to={process.env.PUBLIC_URL + "/sign-up"} title="#" className="text-primary text-decoration-underline">Register now</Link>
                        </div>
                    </div>
                    <AuthRight />
                </div>
            </div>
        </div>
    </>
    )
}
export default Signin;