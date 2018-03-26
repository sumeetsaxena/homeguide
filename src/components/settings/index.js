import React from 'react';
import {Form,FormGroup,FormControl,Col,ControlLabel,Checkbox,Button} from 'react-bootstrap';

export default ()=>(
<div className="jumbotron container">
  <p className="lead">Please enter the Google MAPS API Key, using which the application will retrieve navigation statistics across your region.</p>
  <hr className="my-4"/>
    <Form horizontal>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      API Key
    </Col>
    <Col sm={10}>
      <FormControl type="api_key" placeholder="Please enter your Google Maps API KEY" />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Checkbox>Remember KEY</Checkbox>
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Button type="submit">Save</Button>
    </Col>
  </FormGroup>
</Form>
</div>    
);