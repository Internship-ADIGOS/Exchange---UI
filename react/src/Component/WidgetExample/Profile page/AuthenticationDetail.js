import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AuthenticationDetail() {

    const [ismodal, setIsmodal] = useState(false)

    return (
        <div className="card auth-detailblock">
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Authentication Details</h6>
                {/* <button className="btn btn-primary" onClick={() => { setIsmodal(true) }}><i className="icofont-edit"></i></button> */}
            </div>
            <div className="card-body">
                <div className="row g-3 mb-4">
                    <div className="col-sm-6">
                        <label htmlFor="taxtno111" className="form-label">Current Password</label>
                        <input type="password" className="form-control" id="taxtno111" value="abcxyzabc" onChange={() => { }} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="taxtno111" className="form-label">Password</label>
                        <input type="password" className="form-control" id="taxtno111" value="abcxyzabc" onChange={() => { }} />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="taxtno111" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="taxtno111" value="abcxyzabc" onChange={() => { }} />
                    </div>
                </div>
                <Button>Update</Button>
            </div>
            {/* <Modal show={ismodal} onHide={() => { setIsmodal(false) }} >
                <div className="modal-content">
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expeditLabel">Edit Authentication</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form">
                            <form>
                                <div className="row g-3 mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="item1" className="form-label">User Name</label>
                                        <input type="text" className="form-control" id="item1" value="Adrian007" onChange={() => { }} />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="taxtno111" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="taxtno111" value="abcxyzabc" onChange={() => { }} />
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="taxtno11" className="form-label">Conform Password</label>
                                        <input type="text" className="form-control" id="taxtno11" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <div className="modal-footer" onClick={() => { setIsmodal(false) }}>
                        <button type="button" className="btn btn-secondary">Done</button>
                        <button type="submit" className="btn btn-warning">Save</button>
                    </div>
                </div>
            </Modal>
        */}
        </div> 
    )
}
export default AuthenticationDetail;