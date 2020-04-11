import React, { Component } from "react";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import axios from "axios";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

window.$proxyurl = "https://cors-anywhere.herokuapp.com/";
window.$api = "http://ec2-52-91-80-144.compute-1.amazonaws.com/api/getbyid=1";
let proxyurl = "";
let api = "";

class App extends Component {
  constructor(props) {
    super(props);
  }

  // //variable for list of patients
  // state = {
  //   patients: [],
  // };

  // //function that retrieves data from backend server using RESTful API every time user opens this page
  // //The retrieved data is saved to the variable "patients"
  // componentDidMount() {
  //   proxyurl = window.$proxyurl;
  //   api = window.$api;
  //   axios
  //     .get(proxyurl + api)
  //     .then((response) => response.data)
  //     .then((result) => {
  //       this.setState({ patients: result });
  //       window.$patients = this.state.patients;
  //       console.log("testlog" + this.state.patients.pid);
  //       console.log("testlog1" + window.$patients);
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  render() {
    return (
      /* The content on the App files applies to all pages of the webste */
      <div className="App container">
        {/* Website Header */}
        <p className="bigHeading">UCI Medical Center</p>
        <p className="smallHeading">Radiology Oncology</p>
        {/* Navigation Bar */}
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/menu">Menu</Link>
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
