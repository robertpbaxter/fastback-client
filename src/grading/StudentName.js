import React, { Component } from "react";
import { AuthContext } from "../auth/AuthContext";

class StudentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount = () => this.fetchStudentName();

  fetchStudentName = () => {
    fetch(`/api/user/${this.props.submission.studentId}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.auth.sessionToken
      })
    })
      .then(res => res.json())
      .then(studentData =>
        this.setState({
          firstName: studentData.firstName,
          lastName: studentData.lastName
        })
      );
  };

  render() {
    return (
      <option value={this.props.submission.id}>
        {this.state.lastName}, {this.state.firstName}
      </option>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <StudentName {...props} auth={auth} />}
  </AuthContext.Consumer>
);
