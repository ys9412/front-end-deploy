import React, { Component, useState } from "react";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Badge,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import Dropdown from "react-dropdown";
import "./App.css";
import notification from "./containers/images/SVG/notification.svg";
import Bullet from "./containers/images/SVG/notification_bullet.svg";

// import Dropdown from "react-bootstrap/Dropdown";
const removed = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.goToPatient = this.goToPatient.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    patientsList: [],
    alertMessageList: [
      { pid: 1, name: "Viktor Jin", time: "40 min ", stressLevel: "80 sl" },
      { pid: 2, name: "William Smith", time: "35 min", stressLevel: "78 sl" },
      {
        pid: 3,
        name: "Jennifer Johnson",
        time: "33 min",
        stressLevel: "67 sl",
      },
    ],
    showAlert: false,
    showOptions: false,
    isAuthenticated: false,
    userHasAuthenticated: false,
  };

  handleLogout() {
    // this.state.userHasAuthenticated(false);
    this.setState({ userHasAuthenticated: false });
  }

  goToPatient = (param) => (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info/" + param,
    });
  };

  removeAlert = (param) => (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      alertMessageList: prevState.alertMessageList.filter(
        (message) => message.pid !== param
      ),
    }));
    removed.push(param);
  };

  render() {
    //const test = window.$test;

    console.log("list" + removed);
    //console.log({ test });
    return (
      /* The content on the App files applies to all pages of the webste */
      <div className="App container" style={{ minWidth: 500 }}>
        {/* Website Header */}
        <p className="bigHeading">UCI Medical Center</p>
        <p className="smallHeading">Radiology Oncology</p>
        {/* Navigation Bar */}
        <Navbar fluid collapseOnSelect>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/menu">Menu</Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <NavDropdown
                title={
                  <img src={notification} className="notification_image" />
                }
                noCaret
                id="dropdown-no-caret"
              >
                <div
                  className="test1"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  {this.state.alertMessageList.map((message) => (
                    <div key={message.pid} className="messageTest">
                      {" "}
                      <table className="dropdownMessage">
                        <tbody>
                          <tr>
                            <td className="messageLength">
                              <img
                                src={Bullet}
                                className="notification_bullet"
                              />

                              {message.name +
                                ", " +
                                message.time +
                                ", " +
                                message.stressLevel}
                            </td>
                            <td>
                              <Dropdown drop="right" id="message">
                                <Dropdown.Toggle
                                  style={{ float: "right" }}
                                ></Dropdown.Toggle>

                                <Dropdown.Menu id="dropdownOption">
                                  <a
                                    href=""
                                    onClick={this.removeAlert(message.pid)}
                                  >
                                    <p>Remove alert &nbsp;&nbsp;&nbsp; x </p>
                                  </a>
                                  <a
                                    href=""
                                    onClick={this.goToPatient(message.pid)}
                                  >
                                    <p>See patient info</p>
                                  </a>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </NavDropdown>
              <Badge variant="secondary" className="newAlert">
                {this.state.alertMessageList.length}
              </Badge>
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ? (
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={(this.state.isAuthenticated, this.state.userHasAuthenticated)}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
