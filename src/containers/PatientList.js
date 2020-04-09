import React from "react";
import { Component } from "react";
import { useState } from "react";
import axios from "axios";
import "./PatientList.css";
import { render } from "@testing-library/react";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "http://ec2-52-91-80-144.compute-1.amazonaws.com/api/getbyid=1";

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //variable for list of patients
  state = {
    patients: [],
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  componentDidMount() {
    axios
      .get(proxyurl + api)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
      })
      .catch((error) => console.log("error", error));
  }

  //function that transfers patient data to "DetailedPatientInfo" page
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info",
      data: this.state.patients,
    });
  };

  render() {
    return (
      <div className="list">
        <table id="tableInfo">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.patients.pid}</td>
              <td onClick={this.handleSubmit}>
                {this.state.patients.firstName + " "}
                {this.state.patients.lastName}
              </td>
              <td>25 min 13 sec</td>
            </tr>
            <tr>
              <td>2</td>
              <td onClick={this.handleSubmit}>William Smith</td>
              <td>25 min 13 sec</td>
            </tr>
            <tr>
              <td>3</td>
              <td onClick={this.handleSubmit}>Jennifer Johnson</td>
              <td>20 min 3 sec</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PatientList;
