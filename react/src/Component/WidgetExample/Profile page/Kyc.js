import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { MDBFile } from "mdb-react-ui-kit"
import { useNavigate } from 'react-router';

function Kyc() {

  const navigate = useNavigate()
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [document1, setDocument1] = useState([])
  const [document2, setDocument2] = useState([])
  const [document3, setDocument3] = useState([])
  const [address, setAddress] = useState("")
  const [verify_type, setVerifytype] = useState("passport")
  const [id_number, setIdNumber] = useState("")



  //function for calling the api
  function get_kyc(e) {

    e.preventDefault();
    var imageFile1 = document.querySelector('#customFile')
    var imageFile2 = document.querySelector('#customFile2')
    var imageFile3 = document.querySelector('#customFile3')

    //mkaing of the form data
    var bodyFormData = new FormData();

    //converting into the image files
    //adding fields to the form data
    bodyFormData.append('first_name', firstname)
    bodyFormData.append('last_name', lastname)
    bodyFormData.append('document1', imageFile1.files[0])
    bodyFormData.append('document2', imageFile2.files[0])
    bodyFormData.append('document3', imageFile3.files[0])
    bodyFormData.append('gender', gender)
    bodyFormData.append('address', address)
    bodyFormData.append('verify_type', verify_type)
    bodyFormData.append('id_number', id_number)

    const headers = {
      "x-auth-token": window.localStorage.getItem("token")
    }

    axios.post("http://167.99.86.45:3000/complete_kyc", bodyFormData, { headers })
      .then(response => {
       console.log(response)
       navigate(process.env.PUBLIC_URL + "/");
      })

  }

  return (

    <>
      <div className='card auth-detailblock mt-4 p-2'>
        <h3 >Kyc Details:</h3>
        <Form className="my-2 p-2" onSubmit={get_kyc}>
          <Row className="my-2 p-2">
            {/* <Form.Group as={Row} controlId="formGridState">
              <Form.Label>Id Card Type</Form.Label>
              <Form.Select defaultValue="Passport">
                <option value={"passort"}>Passport1</option>
                <option value={""}>NID</option>
              </Form.Select>
            </Form.Group> */}
            <Form.Group as={Row} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridPassword">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} className="my-2" controlId="formGridAddress1">
              <Form.Label>Verification Type</Form.Label>
              <Form.Select defaultValue="passport" onChange={(e) => setVerifytype(e.target.value)}>
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
            <Form.Group as={Row} controlId="formGridEmail" className='my-2'>
              <Form.Label>Address:</Form.Label>
              <Form.Control placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
          </Row>
          <Row className="mb-3 p-2">
            <Form.Group as={Row} controlId="formGridEmail" className='my-2'>
              <MDBFile type="file" label='Upload Selfie with id card' id='customFile' value={document1} onChange={(e) => setDocument1(e.target.value)} />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridEmail" className="my-2" value={document2} onChange={(e) => setDocument2(e.target.value)}>
              <MDBFile type="file" label='Passport cover' id='customFile2' />
            </Form.Group>

            <Form.Group as={Row} controlId="formGridEmail" className="my-2">
              <MDBFile type="file" label='Passport inner' id='customFile3' value={document3} onChange={(e) => setDocument3(e.target.value)} />
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