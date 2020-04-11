import React, { Component } from "react";
import axios from "axios";
import "./Menu.css";
import location from "./images/SVG/location.svg";
import lookup from "./images/SVG/lookup.svg";
import add from "./images/SVG/add.svg";
import feedback from "./images/SVG/feedback.svg";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "http://ec2-52-91-80-144.compute-1.amazonaws.com/api/getbyid=1";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleMap = this.handleMap.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  //variable for list of patients
  state = {
    patients: [],
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  // componentDidMount() {
  //   // proxyurl = window.$proxyurl;
  //   // api = window.$api;
  //   axios
  //     .get(proxyurl + api)
  //     .then((response) => response.data)
  //     .then((result) => {
  //       this.setState({ patients: result });
  //       //window.$patients = this.state.patients;
  //       console.log("testlog" + this.state.patients.pid);
  //       // console.log("testlog1" + window.$patients);
  //     })
  //     .catch((error) => console.log("error", error));
  // }

  //function that transfers patient data to "Location" page
  handleMap = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./location",
      data: this.state.patients,
    });
  };

  //function that transfers patient data to "PatientList" page
  handleList = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./patient_list",
      data: this.state.patients,
    });
  };

  render() {
    return (
      <div className="Menu">
        <table className="menu">
          <tbody>
            <tr>
              <td>
                {/* <a href="" onClick={this.handleMap}> */}
                <a href="./location">
                  <img className="left" src={location} alt="Location logo" />
                </a>
              </td>
              <td>
                {/* <a href="" onClick={this.handleList}> */}
                <a href="./patient_list">
                  <img className="right" src={lookup} alt="Lookup logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="./add_patient">
                  <img className="left" src={add} alt="Add logo" />
                </a>
              </td>
              <td>
                <a href="./feedback">
                  <img className="right" src={feedback} alt="Feedback logo" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Menu;
