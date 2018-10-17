import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import APIURL from "../helpers/environment";

class AssignmentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      instructions: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const alert = document.getElementById("alert");

    fetch(`${APIURL}/api/assignment/new`, {
      method: "POST",
      body: JSON.stringify({ assignment: this.state }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(assignmentData => {
        assignmentData.error
          ? (alert.innerText = "An error has occurred")
          : this.props.updateAssignmentsArray();
        this.setState({ title: "", instructions: "" }); // No need to clear the problem set value
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <br />
            <h1>Create Assignment</h1>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  maxLength="255"
                  value={this.state.title}
                  placeholder="enter title"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="instructions">Instructions</Label>
                <Input
                  id="instructions"
                  type="textarea"
                  name="instructions"
                  value={this.state.instructions}
                  placeholder="enter instructions"
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <div id="alert" />
              <div className="text-center">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <AssignmentCreate {...props} auth={auth} />}
  </AuthContext.Consumer>
);
