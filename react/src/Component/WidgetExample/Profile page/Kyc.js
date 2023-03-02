import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {MDBFile} from "mdb-react-ui-kit"

function Kyc() {

  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [document1, setDocument1] = useState("")
  const [document2, setDocument2] = useState("")
  const [document3, setDocument3] = useState("")
  const [address, setAddress] = useState("")
  const [verify, setVerify] = useState("")
  const [id_number, setIdNumber] = useState("")

  //function for calling the api
  // function get_kyc(){
  //   e.preventDefault()

  // }

  return (

    <>
    <div className='card auth-detailblock mt-4 p-2'>
    <h3 >Kyc Details:</h3>
    <Form className="mt-2 p-2">
      <Row className="mb-2 p-2">
        <Form.Group as={Row} controlId="formGridState">
          <Form.Label>Id Card Type</Form.Label>
          <Form.Select defaultValue="Passport">
            <option value={"passort"}>Passport1</option>
            <option value={""}>NID</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Row} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Row} controlId="formGridPassword">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" placeholder="Enter last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Passport/NID/Liscence Number</Form.Label>
        <Form.Control placeholder="Passport/NID/Liscence Number" value={id_number} onChange={(e) => setIdNumber(e.target.value)}/>
      </Form.Group>
          </Row>
      <fieldset>
        <Form.Group as={Row} className="mb-3 p-2" onChange={(e) => setGender(e.target.value)}>
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              value="0"
              label="Male"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              />
            <Form.Check
              type="radio"
              value="1"
              label="Female"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              />
          </Col>
        </Form.Group>
      </fieldset>

      <Row className="mb-3 p-2">
      <Form.Group as={Row} controlId="formGridEmail" className='mb-2'>
          <MDBFile label='Upload Selfie with id card' id='customFile' />
        </Form.Group>

      <Form.Group as={Row} controlId="formGridEmail" className="mb-2">
          <MDBFile label='Passport cover' id='customFile2' />
        </Form.Group>

      <Form.Group as={Row} controlId="formGridEmail" className="mb-2">
          <MDBFile label='Passport inner' id='customFile3' />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  );
}

export default Kyc;