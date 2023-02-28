import React from 'react'
import { Form } from 'react-bootstrap'
import { MDBFile } from 'mdb-react-ui-kit'
import axios from "axios"
import { useState, useEffect} from 'react'

const BankDetails = () => {

  const [acc_no, setAcc_no] = useState("")
  const [acc_name, setAcc_name] = useState("")
  const [bank_name, setBank_name] = useState("")
  const [branch_name, setBranch_name] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [upi, setUpi] = useState("")
  const [type, setType] = useState("")
  const [file1, setFile1] = useState("")


 function bank_verify(e){

   e.preventDefault()

   const token = window.localStorage.getItem("token")
  
  //form data 
  const data = {
    file1: file1,
    method:"BANK",
    acc_name: acc_name,
    acc_no: acc_no,
    branch_name: branch_name,
    ifsc_code: ifsc,
    upi: upi,
    type: type,
    bank_name: bank_name
  }

  axios.post("http://167.99.86.45:3000/bank_payout",data, {
    headers:{
      "x-auth-token": token
    }
  }).then(response => {
    console.log("Hogya :D")
    console.log(response)
  }).catch(err => {
    console.error(err)
  })
 }

 useEffect(()=>{
   
 }, [])

  return (
    <div>
    <form onSubmit={bank_verify}>

  <div class="form-group">
    <label for="exampleInputEmail1">Bank Account No</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Account Number"
    value={acc_no} 
    onChange={(e)=> setAcc_no(e.target.value)}
    />

    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Account Holders Name</label>
    <input type="text" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter Account Holder's name"
    value={acc_name} 
    onChange={(e)=> setAcc_name(e.target.value)}
    />

    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Bank Name</label>
    <input type="text" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter Bank Name"
    value={bank_name}
    onChange={(e)=> setBank_name(e.target.value)}
    />
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Branch Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Branch Name"
    value={branch_name}
    onChange={(e)=> setBranch_name(e.target.value)}
    />
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">IFSC Code</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter IFSC code" 
    value={ifsc} 
    onChange={(e) => setIfsc(e.target.value)}
    />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">UPI ID</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter UPI ID"
    value={upi} 
    onChange={(e)=> setUpi(e.target.value)}
     />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>

  <Form.Group controlId="formGridState">
          <Form.Label>Account Type</Form.Label>
          <Form.Select defaultValue="Passport"  onChange={(e) => setType(e.target.value)}>
            <option value="saving">Savings account</option>
            <option value="current">Current account</option>
          </Form.Select>
  </Form.Group>
 
  <Form.Group  controlId="formGridEmail" className="mt-2 mb-2">
          <MDBFile label='Passport image' id='customFile' value={file1} onChange={(e) => setFile1(e.target.value)} />
   </Form.Group>

  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
  )
}

export default BankDetails