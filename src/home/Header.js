import React, { Component } from "react";
import { Route } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Badge,
  Container
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssignmentIndex from "../assignments/AssignmentIndex";
import Auth from "../auth/Auth";
import UserIndex from "../admin/UserIndex";
import StudentIndex from "../student/StudentIndex";
import { AuthContext } from "../auth/AuthContext";
import "../App.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed }); //swap the boolean in state
  toggleRole = () => this.setState({ visibleRole: !this.state.visibleRole });

  buttonView = () => {
    if (this.props.auth.sessionToken === localStorage.getItem("token")) {
      return (
        <div className="navWrapper">
          <NavItem>
            <Button
              size="md"
              id="logout"
              onClick={() => this.props.clickLogout()}
            >
              <FontAwesomeIcon icon="sign-out-alt" />
            </Button>
          </NavItem>
        </div>
      ); //render logout button if active token
    } else {
      return <div />; //otherwise nothing
    }
  };

  navbarBrandView = () => {
    if (this.props.auth.sessionToken === localStorage.getItem("token")) {
      return (
        <NavbarBrand>
          Welcome,{" "}
          <Badge>{this.props.auth.sessionPermission.toUpperCase()}</Badge>
        </NavbarBrand>
      );
    } else {
      return (
        <NavbarBrand>
          <i>Fastback</i>
        </NavbarBrand>
      );
    }
  };

  protectedView = () => {
    switch (true) {
      case this.props.auth.sessionToken === localStorage.getItem("token") &&
        this.props.auth.sessionPermission === "admin":
        return <Route exact path="/" component={UserIndex} />;
      case this.props.auth.sessionToken === localStorage.getItem("token") &&
        this.props.auth.sessionPermission === "instructor":
        return <Route exact path="/" component={AssignmentIndex} />;
      case this.props.auth.sessionToken === localStorage.getItem("token") &&
        this.props.auth.sessionPermission === "student":
        return <Route exact path="/" component={StudentIndex} />;
      default:
        return <Route exact path="/" component={Auth} />;
    }
  };

  render() {
    return (
      <div>
        <Navbar light expand="md">
          {this.navbarBrandView()}
          <Nav className="ml-auto" navbar>
            {this.buttonView()}
          </Nav>
        </Navbar>
        <Container className="body">{this.protectedView()}</Container>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Header {...props} auth={auth} />}
  </AuthContext.Consumer>
);
