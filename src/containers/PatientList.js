import React from "react";
import { Component } from "react";
import axios from "axios";
import "./PatientList.css";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const api = "https://lachesisfitbit.com/api/getbyid=1";
const apiAll = "https://lachesisfitbit.com/api/getAllPatients";

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
      .get(proxyurl + apiAll)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
      })
      .catch((error) => console.log("error", error));
  }

  //redirect the user to the "DetailedPatientInfo" page for the patient clicked, and pass patient id as parameter in url.
  handleSubmit = (param) => (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info/" + param,
      data: param,
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
            {this.state.patients.map((patient) => (
              <tr key={patient.pid}>
                <td>{patient.pid}</td>
                <td onClick={this.handleSubmit(patient.pid)}>
                  {patient.firstName + " "}
                  {patient.lastName}
                </td>
                <td>25 min 13 sec</td>
              </tr>
            ))}
            {/* <tr>
              <td>2</td>
              <td onClick={this.handleSubmit}>William Smith</td>
              <td>25 min 13 sec</td>
            </tr>
            <tr>
              <td>3</td>
              <td onClick={this.handleSubmit}>Jennifer Johnson</td>
              <td>20 min 3 sec</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PatientList;
