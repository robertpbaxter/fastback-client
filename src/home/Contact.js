import React from "react";
import { Modal, Button, Form, Label, Input, Row, Col } from "reactstrap";
import "../App.css";

const Contact = props => (
  <Modal isOpen={true} size="md" className="text-center" id="contact">
    <Form
      css="max-width: 500px;"
      action="//formspree.io/roer.baxter@gmail.com"
      method="POST"
    >
      <h1>Contact me</h1>
      <hr />
      <p>Would you like to see the instructor interface?</p>
      <p>Would you like to adjust users as an admin?</p>
      <p>Would like to speak via telephone or schedule an internview?</p>
      <p>This form works!</p>
      <hr />
      <Row>
        <Col>
          <Label for="name">Name</Label>
          <Input id="name" type="text" placeholder="your name" name="name" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your email"
            name="email"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Label for="message">Message</Label>
          <Input
            id="message"
            type="textarea"
            rows="5"
            placeholder="your message"
            name="message"
          />
        </Col>
      </Row>
      <Input
        type="hidden"
        name="_subject"
        value="Message via http://domain.com"
      />
      <div className="text-center">
        <Button type="submit">Submit</Button>{" "}
        <Button onClick={() => props.cancel()}>Cancel</Button>
      </div>
    </Form>
  </Modal>
);

export default Contact;
