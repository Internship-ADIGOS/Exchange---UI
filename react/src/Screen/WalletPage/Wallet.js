import React from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useState, useEffect } from 'react'

const columns = [
    {
        id: 1,
        title: "Coin Symbol/Name"
    },
    {
        id: 3,
        title: "Available balance"
    },
    {
        id: 2,
        title: "In Trade balance"
    },
]


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
        console.log(info[1])
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
                                    {/* {info.map((item, index) => {
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{item[0]}{item[index].fullname}{item[0].image}</td>
                                            <td>{}</td>
                                            <td>@mdo</td>
                                        </tr>
                                    })
                                    } */}

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