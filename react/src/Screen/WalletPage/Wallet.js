import React from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useState, useEffect } from 'react'


const Wallet = () => {

    const [info, setInfo] = useState([])

    // function for calling the api
    function get_coins() {

        const token = window.localStorage.getItem("token")
        const headers = {
            "x-auth-token": token
        }
        axios.post("http://167.99.86.45:3000/get_wallet", null, { headers }).then(response => {
            // console.log(response.data.data)
            setInfo(response.data.data)
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        get_coins(); //calling the api 
        console.log(info)
    })

    return (
        <div className="col-xl-12">
            <div className="card">
                <div className="card-header py-3 d-flex justify-content-between">
                    <h6 className="mb-0 fw-bold">Recent Transactions</h6>
                </div>
                <div className="card-body">
                    <div id="ordertabthree_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                        <div className="" style={{ display: 'flex', flexWrap: 'wrap' }} >
                            <div className="col-sm-12 col-md-6 mb-2 " style={{ display: 'flex', alignItems: 'center' }}>
                                <div id="myDataTable_filter" className="dataTables_filter">
                                    <label className='d-flex align-items-center'>Search:<div className='mx-1'><input type="search" className="form-control" /></div></label>
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Coin/Symbol Name</th>
                                        <th scope="col">Available balance</th>
                                        <th scope="col">In trade balance</th>
                                        <th scope="col">Fund wallet</th>
                                        <th scope="col">Share wallet</th>
                                        <th scope="col">Total balance</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>{info[0].image}{info[0].symbol}{info[0].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>{info[1].image}{info[1].symbol}{info[1].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>{info[2].image}{info[2].symbol}{info[2].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>{info[3].image}{info[3].symbol}{info[3].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>{info[4].image}{info[4].symbol}{info[4].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">6</th>
                                            <td>{info[5].image}{info[5].symbol}{info[5].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">7</th>
                                            <td>{info[6].image}{info[6].symbol}{info[6].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">8</th>
                                            <td>{info[7].image}{info[7].symbol}{info[7].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">9</th>
                                            <td>{info[8].image}{info[8].symbol}{info[8].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">10</th>
                                            <td>{info[9].image}{info[9].symbol}{info[9].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">11</th>
                                            <td>{info[10].image}{info[0].symbol}{info[0].full_name}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet