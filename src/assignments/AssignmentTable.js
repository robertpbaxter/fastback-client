import React, { Component } from "react";
import { Table, Button, Row, Col } from "reactstrap";
import GradingModal from "../grading/GradingModal";
import { AuthContext } from "../auth/AuthContext";

class AssignmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      assignmentIdToGrade: "",
      gradingWindow: false
    };
  }

  fetchSubmissions = e => {
    this.setState({ gradingWindow: true, assignmentIdToGrade: e.target.id });
    fetch(`/api/submission/grading/${e.target.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(submissionsData => this.setState({ submissions: submissionsData }));
  };

  closeSubmissions = () => {
    this.setState({
      submissions: [],
      assignmentIdToGrade: "",
      gradingWindow: false
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="text-center">
          <hr />
          <h3>Assignments</h3>
          <hr />
          <p>Click on any row below to bring up a grading window</p>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Title</th>
              <th scope="col">Instructions</th>
              <th scope="col" style={{ width: "10%" }}>
                Modify
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.assignments.map(assignment => {
              return (
                <tr key={assignment.id}>
                  <th
                    className="pointer"
                    id={assignment.id}
                    onClick={this.fetchSubmissions}
                  >
                    {assignment.title}
                  </th>
                  <td
                    className="pointer"
                    id={assignment.id}
                    onClick={this.fetchSubmissions}
                  >
                    {assignment.instructions}
                  </td>
                  <td className="buttons align-middle">
                    <Button
                      id={assignment.id}
                      onClick={e => this.props.edit(e, assignment)}
                    >
                      Edit
                    </Button>
                    <Button
                      id={assignment.id}
                      onClick={e => this.props.delete(e, assignment.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col>
            {this.state.gradingWindow ? (
              <GradingModal
                submissions={this.state.submissions}
                close={this.closeSubmissions}
                assignmentIdToGrade={this.state.assignmentIdToGrade}
              />
            ) : (
              <div />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <AssignmentTable {...props} auth={auth} />}
  </AuthContext.Consumer>
);
