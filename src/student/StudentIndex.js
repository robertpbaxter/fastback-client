import React, { Component } from "react";
import { Container, Row, Col, Form, Label, Input, Button } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import "./Student.css";
import APIURL from "../helpers/environment";

class StudentIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      assignments: [],
      submission: {},
      currentAssignment: {},
      instructorId: "",
      content: "",
      grade: ""
    };
  }

  componentDidMount = () => {
    this.fetchInstructors();
  };

  fetchInstructors = () => {
    fetch(`${APIURL}/api/user/instructors`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(instructorData => this.setState({ instructors: instructorData }));
  };

  displayAssignments = e => {
    //take the selected instructor's id and fetch all assignments
    this.setState({ instructorId: e.target.value });
    fetch(`${APIURL}/api/assignment/${e.target.value}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(assignmentData => this.setState({ assignments: assignmentData }));
  };

  displayInstructions = e => {
    if (e.target.value !== "unselected") {
      fetch(`${APIURL}/api/assignment/item/${e.target.value}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.auth.sessionToken
        })
      })
        .then(res => res.json())
        .then(currentAssignment =>
          this.setState({ currentAssignment: currentAssignment })
        );
      this.fetchSubmission(e.target.value); //I have to feed the assignmentId value directly into the fetch
    }
  };

  fetchSubmission = assignmentId => {
    fetch(
      `${APIURL}/api/submission/${this.state.instructorId}/${assignmentId}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.auth.sessionToken
        })
      }
    )
      .then(res => res.json())
      .then(
        submissionData =>
          submissionData === null
            ? this.createSubmission(assignmentId)
            : this.setState({
                submission: submissionData,
                content: submissionData.content,
                grade: submissionData.grade
              })
      );
  };

  createSubmission = assignmentId => {
    fetch(`${APIURL}/api/submission`, {
      method: "POST",
      body: JSON.stringify({
        submission: {
          instructorId: this.state.instructorId,
          assignmentId: assignmentId,
          content: "",
          grade: ""
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionData =>
        this.setState({
          submission: submissionData.submission,
          content: ""
        })
      );
  };

  updateSubmission = () => {
    fetch(`${APIURL}/api/submission/${this.state.submission.id}`, {
      method: "PUT",
      body: JSON.stringify({
        submission: {
          content: this.state.content
        }
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionData => this.setState.submissionData);

    alert("Successfully submitted.");
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    this.state.instructorId === "" ||
    this.state.currentAssignment.id === undefined
      ? alert("You must select an assignment first.")
      : this.updateSubmission();
    e.preventDefault();
  };

  render() {
    const instructorRoster = //populate the dropdown list with results from the fetch
      this.state.instructors.length >= 1 ? (
        this.state.instructors.map(instructor => {
          return (
            <option key={instructor.id} value={instructor.id}>
              {instructor.lastName}, {instructor.firstName}
            </option>
          );
        })
      ) : (
        <option>No instructors found</option>
      );

    const assignmentRoster = //only show a dropdown menu if there are assignments to display
      this.state.assignments.length >= 1 ? (
        <Form onChange={this.displayInstructions}>
          <Label for="selectAssignment">Select your assignment:</Label>
          <Input type="select" name="selectAssignment" id="selectAssignment">
            <option value="unselected" />
            {this.state.assignments.map((assignment, index) => {
              return (
                <option key={index} id={assignment.id} value={assignment.id}>
                  {assignment.title}
                </option>
              );
            })}
          </Input>
        </Form>
      ) : (
        <div />
      );

    const inCaseItsUngraded =
      this.state.grade === "" ? (
        <div />
      ) : (
        <p>
          Current grade: <b>{this.state.grade}</b>
        </p>
      );

    return (
      <Container>
        <Row>
          <Col md="4">
            <div className="assignmentWindow">
              <br />
              <h1>Assignment</h1>
              <hr />
              <Form onChange={this.displayAssignments}>
                <Label for="selectInstructor">Select your instructor:</Label>
                <Input
                  type="select"
                  name="selectInstructor"
                  id="selectInstructor"
                >
                  <option />
                  {instructorRoster}
                </Input>
              </Form>
              {assignmentRoster}
            </div>
          </Col>
          <Col md="8">
            <div className="submissionWindow">
              <h1>{this.state.currentAssignment.title}</h1>
              <hr />
              <h4>{this.state.currentAssignment.instructions}</h4>
              <div id="alert" />
              <Form onSubmit={this.handleSubmit}>
                <Input
                  id="content"
                  type="textarea"
                  rows="9"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
                <Button type="submit" style={{ float: "right" }}>
                  Submit
                </Button>
              </Form>
              <Button id="ungraded">{inCaseItsUngraded}</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <StudentIndex {...props} auth={auth} />}
  </AuthContext.Consumer>
);
