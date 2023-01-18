import React from 'react';
import P1 from '../../assets/images/profile_av.svg'
import axios from 'axios';
import { useEffect, useState } from 'react';


function UserDetailcard() {

    const [data, setData] = useState([])

    //function for the fetching the user data
    const getUserDetails = () =>{
        const token = window.localStorage.getItem('token')

        const headers = {
            "x-auth-token": token
        }

        axios.get("http://167.99.86.45:3000/getsingleuser", {headers})
        .then(response=>{
            console.log(response)
            setData(response.data)
        }).catch(error=>{
            console.error(error)
        })
    }

    useEffect(()=>{
        getUserDetails()   
    }, [])

    return (
        <div className="row g-3 mb-3">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="d-flex">
                                    <img className="avatar rounded-circle" src={P1}alt="profile"/>
                                        <div className="flex-fill ms-3">
                                            <p className="mb-0"><span className="font-weight-bold">{data.first_name}</span></p>
                                            <small className="">{data.email}</small>
                                        </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="d-flex flex-column">
                                    <span className="text-muted mb-1">User ID: {data.user_id}</span>
                                    <span className="small text-muted flex-fill text-truncate">Last login time 2021-09-29 10:56:22</span>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-2">
                                <div className="d-flex-inline">
                                    <span className="badge bg-careys-pink mb-1">Personal</span>
                                    <span className="small text-muted d-flex align-items-center"><i className="icofont-diamond px-1 fs-5 color-lightyellow "></i> VIP</span>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-4">
                                <a href="referral.html" title="invite" className="btn btn-primary text-dark mb-1">40% commission:Invite friends now!</a>
                                <a href="#!" title="invite" className="d-block"><i className="icofont-twitter px-1 fs-6 color-lightblue"></i>not linked</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailcard;