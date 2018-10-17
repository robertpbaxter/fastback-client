import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { AuthContext } from "./AuthContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() });

  handleSubmit = e => {
    e.preventDefault();
    const alert = document.getElementById("alert");

    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ user: this.state }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // I need to throw an rejection error when the username and password fail to match
          alert.innerText = "Username or password invalid";
        } else {
          this.props.auth.setToken(data.sessionToken);
          this.props.auth.setPermission(data.user.permission);
        }
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <br />
            <div className="text-center">
              <h1>Fastback</h1>
              <h3>Mobile feedback</h3>
            </div>
            <hr />
            <h1>Log in</h1>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="li_email"
                  type="text"
                  name="email"
                  maxLength="255"
                  placeholder="enter email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="li_password"
                  type="password"
                  name="password"
                  maxLength="255"
                  placeholder="enter password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div id="alert" />
              <hr />
              <Button type="submit" block>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Login {...props} auth={auth} />}
  </AuthContext.Consumer>
);
