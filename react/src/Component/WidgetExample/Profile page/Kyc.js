import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {MDBFile} from "mdb-react-ui-kit"

function Kyc() {
  return (
    <>
    <div className='card auth-detailblock mt-4 p-2'>
    <h3 >Kyc Details:</h3>
    <Form className="mt-2 p-2">
      <Row className="mb-2 p-2">
        <Form.Group as={Row} controlId="formGridState">
          <Form.Label>Id Card Type</Form.Label>
          <Form.Select defaultValue="Passport">
            <option>Passport1</option>
            <option>Passport2</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Row} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group as={Row} controlId="formGridPassword">
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" placeholder="Enter last Name" />
        </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Passport/NID/Liscence Number</Form.Label>
        <Form.Control placeholder="Passport/NID/Liscence Number" />
      </Form.Group>

          </Row>
      <fieldset>
        <Form.Group as={Row} className="mb-3 p-2">
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              />
            <Form.Check
              type="radio"
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