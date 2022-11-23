import { React, useState, useEffect } from "react";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthRight from "./AuthRight";

// function validate_password() {

//     var pass = document.getElementById('pass').value;
//     var confirm_pass = document.getElementById('pass2').value;
//     if (pass !== confirm_pass) {
//         document.getElementById('wrong_pass_alert').style.color = 'red';
//         document.getElementById('wrong_pass_alert').innerHTML
//             = '☒ Use same password';
//         document.getElementById('create').disabled = true;
//         document.getElementById('create').style.opacity = (0.4);
//     } else {
//         document.getElementById('wrong_pass_alert').style.color = 'green';
//         document.getElementById('wrong_pass_alert').innerHTML =
//             '🗹 Password Matched';
//         document.getElementById('create').disabled = false;
//         document.getElementById('create').style.opacity = (1);
//     }
// }

// function wrong_pass_alert() {
//     if (document.getElementById('pass').value !== "" &&
//         document.getElementById('pass2').value !== "") {
//         alert("Your response is submitted");
//     } else {
//         alert("Please fill all the fields");
//     }
// }

function Signup() {

    const [isError, setError] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conf_pass, setConf_pass] = useState("")
    const [ref, setRef] = useState("")


    useEffect(() => {
        onLoad();
    }, []);

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
                                                    <form>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Name</label>
                                                            <input type="name" className="form-control"
                                                              value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Email address</label>
                                                            <input type="email" className="form-control" value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
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
                                                            <input type="password" className="form-control" id="pass1" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Confirm Password</label>
                                                            <input type="password" className="form-control" id="pass2" />
                                                        </div>
                                                        <span id="wrong_pass_alert"></span>
                                                        <div className="mb-3">
                                                            <label className="form-label fs-6">Referral ID</label>
                                                            <input type="text" className="form-control" id="ref_code2" />
                                                        </div>
                                                        <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2" onClick="wrong_pass_alert()">Create Account</button>
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