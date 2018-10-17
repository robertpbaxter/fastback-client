import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../auth/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AssignmentTable from "./AssignmentTable";
import AssignmentCreate from "./AssignmentCreate";
import AssignmentEdit from "./AssignmentEdit";
import "./Assignment.css";

class AssignmentIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      assignmentToUpdate: {},
      showEditMenu: false
    };
  }

  componentDidMount = () => this.fetchAssignments();

  fetchAssignments = () => {
    fetch("/api/assignment", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(assignmentData => this.setState({ assignments: assignmentData }));
  };

  deleteAssignment = (e, assignmentId) => {
    console.log(assignmentId);
    confirmAlert({
      title: "Are you sure you want to delete this assignment?",
      message: "All submissions will be lost.",
      buttons: [
        {
          label: "Yes, delete.",
          onClick: () =>
            fetch(`/api/assignment/${assignmentId}`, {
              method: "DELETE",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.auth.sessionToken
              })
            }).then(res => this.fetchAssignments())
        },
        {
          label: "No, cancel.",
          onClick: () => this.fetchAssignments()
        }
      ]
    });
  };

  editAssignment = (e, assignment) => {
    fetch(`/api/assignment/${assignment.id}`, {
      method: "PUT",
      body: JSON.stringify({ assignment: assignment }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    }).then(res => {
      this.setState({ showEditMenu: false });
      this.fetchAssignments();
    });
  };

  setUpdatedAssignment = (e, assignment) =>
    this.setState({ assignmentToUpdate: assignment, showEditMenu: true }); // select the id to edit and bring up the edit modal

  cancelEdit = e => {
    this.setState({ showEditMenu: false });
  };

  render() {
    const assignments =
      this.state.assignments.length >= 1 ? (
        <AssignmentTable
          assignments={this.state.assignments}
          delete={this.deleteAssignment}
          edit={this.setUpdatedAssignment}
        />
      ) : (
        <p>Welcome! Create an assignment!</p>
      );

    return (
      <Container>
        <Row>
          {!this.state.showEditMenu ? (
            <AssignmentCreate updateAssignmentsArray={this.fetchAssignments} />
          ) : (
            <div />
          )}
        </Row>
        <Row>
          {this.state.showEditMenu ? ( //Edit menu will only appear if true
            <AssignmentEdit
              edit={this.editAssignment}
              assignment={this.state.assignmentToUpdate}
              cancel={this.cancelEdit}
            />
          ) : (
            <div />
          )}
        </Row>

        <Row>
          <Col id="assignments">{assignments}</Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <AssignmentIndex {...props} auth={auth} />}
  </AuthContext.Consumer>
);
