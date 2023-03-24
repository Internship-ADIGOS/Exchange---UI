import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MDBFile } from "mdb-react-ui-kit"

function Kyc() {

  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [document1, setDocument1] = useState([])
  const [document2, setDocument2] = useState([])
  const [document3, setDocument3] = useState([])
  const [address, setAddress] = useState("")
  const [verify_type, setVerifytype] = useState("")
  const [id_number, setIdNumber] = useState("")

  //mkaing of the form data
  var bodyFormData = new FormData();

  //adding fields to the form data
  bodyFormData.append('first_name', firstname)
  bodyFormData.append('last_name', lastname)
  bodyFormData.append('document1', document1)
  bodyFormData.append('document2', document2)
  bodyFormData.append('document3', document3)
  bodyFormData.append('gender', gender)
  bodyFormData.append('address', address)
  bodyFormData.append('verify', gender)

  //function for calling the api
  function get_kyc() {




  }

  return (

    <>
      <div className='card auth-detailblock mt-4 p-2'>
        <h3 >Kyc Details:</h3>
        <Form className="mb-2 p-2" onSubmit={get_kyc}>
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
              <Form.Control type="text" placeholder="Enter first name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridPassword">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
              <Form.Label>Verification Type</Form.Label>
              <Form.Select defaultValue="Passport" onChange={(e) => setVerifytype(e.target.value)}>
                <option value="passport">Passport number</option>
                <option value="NID">NID number</option>
                <option value="Liscence">Liscence number</option>
              </Form.Select>

              <Form.Control placeholder="Passport/NID/Liscence Number" value={id_number} onChange={(e) => setIdNumber(e.target.value)} />
            </Form.Group>
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
            <Form.Group as={Row} controlId="formGridEmail" className='mb-2'>
              <Form.Label>Address:</Form.Label>
              <Form.Control placeholder="Enter address" value={id_number} onChange={(e) => setIdNumber(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-3 p-2">
            <Form.Group as={Row} controlId="formGridEmail" className='mb-2'>
              <MDBFile label='Upload Selfie with id card' id='customFile' value={document1} onChange={(e) => setDocument1(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridEmail" className="mb-2" value={document2} onChange={(e) => setDocument2(e.target.value)}>
              <MDBFile label='Passport cover' id='customFile2' />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridEmail" className="mb-2">
              <MDBFile label='Passport inner' id='customFile3' value={document3} onChange={(e) => setDocument3(e.target.value)} />
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