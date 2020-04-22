import React, { Component, useState } from "react";
import Routes from "./Routes";
import { Link } from "react-router-dom";
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
// import Dropdown from "react-bootstrap/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    patientsList: [],
    alertMessageList: [
      { id: 1, name: "Viktor Jin", time: "40 min ", stressLevel: "80 sl" },
      { id: 2, name: "William Smith", time: "35 min", stressLevel: "78 sl" },
      { id: 3, name: "Jennifer Johnson", time: "33 min", stressLevel: "67 sl" },
    ],
    showAlert: false,
    showOptions: false,
  };

  openOptions = (e) => {
    console.log("working");
    // this.setState({ showOptions: true });
    this.setState((prevState) => ({ showOptions: !prevState.showOptions }));
  };

  render() {
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
                    <div
                      key={message.id}
                      className="messageTest"
                      onClick={this.openOptions}
                    >
                      <Dropdown drop="right" id="dropdownMessage">
                        <Dropdown.Toggle style={{ width: 300 }}>
                          {message.name +
                            ", " +
                            message.time +
                            ", " +
                            message.stressLevel}
                        </Dropdown.Toggle>
                        <Dropdown.Menu id="dropdownOption">
                          <a href="">
                            <p>Remove alert &nbsp;&nbsp;&nbsp; x </p>
                          </a>
                          <a href="">
                            <p>See patient info</p>
                          </a>
                        </Dropdown.Menu>
                      </Dropdown>
                      {/* {this.state.showOptions ? (
                        <ul className="options">
                          <button>remove alert</button>
                          <button>patient info</button>
                        </ul>
                      ) : (
                        <p></p>
                      )} */}
                    </div>
                  ))}
                </div>
                {/* <ul onClick={this.openOptions}>
                  test
                  {this.state.showOptions ? (
                    <ul className="options">
                      <li>1</li>
                      <li>2</li>
                    </ul>
                  ) : (
                    <p></p>
                  )}
                </ul>
                <p className="nestedNav">onMouseOver</p>
                <p className="nestedNav">test</p> */}
              </NavDropdown>
              <Badge variant="secondary" className="newAlert">
                {this.state.alertMessageList.length}
              </Badge>
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
