import { React, useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthRight from "./AuthRight";
import axios from "axios";

function Signup() {
    
    const navigate = useNavigate()

    const [isError, setError] = useState("")
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [conf_pass, setConf_pass] = useState("")
    const [ref, setRef] = useState("")


    const checkValidation = (e) => {
        const conf_pass = e.target.value
        setConf_pass(conf_pass)
        if (password != conf_pass) {
            setError("Passwords are not matching")
        } else {
            setError("")
        }
    }

    //on Load function 
    const onLoad = () => {
        let refCode = window.location.search.replace("?ref=", "")
        let elem = document.getElementById('ref_code')
        let elem2 = document.getElementById('ref_code2')
        elem.value = refCode
        elem2.value = refCode
    }

    //reload when call the function
    useEffect(() => {
        onLoad();
    }, []);


    // api integration
    const registerUser = (e) => {
        const headers = {
            'Content-Type': 'application/json; charst=UTF-8',
            "Access-Control-Allow-Origin":"http://167.99.86.45:3000",
            "Access-Control-Allow-Credentials": true
        }

        // object of the data fields
        e.preventDefault()
        const data = {
            Fname: Fname,
            Lname: Lname,
            email: email,
            phone: phone,
            password: password,
        }

        axios.post("http://167.99.86.45:3000/create",headers, data).then(response => {
            console.log("Succesfully registered")
            navigate(process.env.PUBLIC_URL + "/sign-in")
            alert("You have successfully register")
            // const ans = response.data
            // console.log(ans)
        }).catch(err=> {
            console.log(err)
        })
    }

    return (
        <>
            <div className="body d-flex p-0 p-xl-5">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
                            <div className="d-flex flex-column">
                                <h1>Create Your Account</h1>
                                <span className="text-muted">Register with your email or mobile</span>
                                <Tab.Container defaultActiveKey="first">
                                    <Nav className="nav nav-pills mt-4" role="tablist">
                                        <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="first">Email</Nav.Link></Nav.Item>
                                        <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="second">Mobile</Nav.Link></Nav.Item>
                                    </Nav>
                                    <Tab.Content className="tab-content mt-4 mb-3">
                                        <Tab.Pane className="tab-pane fade" id="Email" eventKey="first">
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <form onSubmit={registerUser}>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">First Name</label>
                                                            <input type="name" className="form-control"
                                                                value={Fname}
                                                                onChange={(e) => setFname(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Last Name</label>
                                                            <input type="name" className="form-control"
                                                                value={Lname}
                                                                onChange={(e) => setLname(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Email address</label>
                                                            <input type="email" className="form-control" value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Phone</label>
                                                            <input type="phone" className="form-control" value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                maxLength={10}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Password</label>
                                                            <input type="password" className="form-control" value={password} minLength={6} required id="pass1"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Confirm Password</label>
                                                            <input type="password" className="form-control" id="pass2" minLength={6} required
                                                                value={conf_pass} onChange={(e) => checkValidation(e)}
                                                            />
                                                        </div>
                                                        <span id="wrong_pass">{isError}</span>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Referral ID</label>
                                                            <input type="text" className="form-control" id="ref_code" value={ref}
                                                                onChange={(e) => setRef(e.target.value)}
                                                            />
                                                        </div>
                                                        <button type="submit" id="create" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                                                        >Create Account</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane className="tab-pane fade" id="Mobile" eventKey="second">
                                            <div className="card">
                                                <div className="card-body p-4">
                                                    <form>
                                                        <label className="form-label fs-6">Mobile</label>
                                                        <Dropdown className="input-group mb-3">
                                                            <Dropdown.Toggle className="btn btn-outline-secondary dropdown-toggle" type="button">+91 India</Dropdown.Toggle>
                                                            <Dropdown.Menu className="dropdown-menu">
                                                                <li><Dropdown.Item className="dropdown-item" href="#!">+376 Andora</Dropdown.Item></li>
                                                                <li><Dropdown.Item className="dropdown-item" href="#!">+61 Australia</Dropdown.Item></li>
                                                                <li><Dropdown.Item className="dropdown-item" href="#!">+55 Brazil</Dropdown.Item></li>
                                                            </Dropdown.Menu>
                                                            <input type="text" className="form-control" />
                                                        </Dropdown>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Password</label>
                                                            <input type="password" className="form-control" value={password} minLength={6} required id="pass1"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Confirm Password</label>
                                                            <input type="password" className="form-control" id="pass2" minLength={6} required
                                                                value={conf_pass} onChange={(e) => checkValidation(e)}
                                                            />
                                                        </div>
                                                        <span id="wrong_pass_alert">{isError}</span>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Referral ID</label>
                                                            <input type="text" className="form-control" id="ref_code2" value={ref}
                                                                onChange={(e) => setRef(e.target.value)}
                                                            />
                                                        </div>
                                                        <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2">Create Account</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                                <Link to={process.env.PUBLIC_URL + "/sign-in"} title="#"> Already registered? <span className="text-secondary text-decoration-underline">Log In</span></Link>
                            </div>
                        </div>
                        <AuthRight />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;