import React from 'react'
import { Form } from 'react-bootstrap'
import { MDBFile } from 'mdb-react-ui-kit'

const BankDetails = () => {
  return (
    <div>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Bank Account No</label>
    <input type="numbers" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Account Number" />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Bank Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Bank Name" />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Branch Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Branch Name" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">IFSC Code</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter IFSC code" />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">UPI ID</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter UPI ID" />
    <small id="emailHelp" class="form-text text-muted">Following Detail is Authentic!</small>
  </div>

  <Form.Group controlId="formGridState">
          <Form.Label>Account Type</Form.Label>
          <Form.Select defaultValue="Passport">
            <option value={"saving"}>Savings Acc</option>
            <option value={"current"}>Current Acc</option>
          </Form.Select>
  </Form.Group>
 
  <Form.Group  controlId="formGridEmail" className="mt-2 mb-2">
          <MDBFile label='Passport image' id='customFile' />
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