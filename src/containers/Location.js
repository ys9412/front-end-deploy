import React, { Component } from "react";
import axios from "axios";
import "./Location.css";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";
import triangle from "./images/SVG/triangle.svg";
import star from "./images/SVG/star.svg";
import { render } from "react-dom";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "http://ec2-52-91-80-144.compute-1.amazonaws.com/api/getbyid=1";

class Location extends Component {
  //patient information that transferred from menu page.
  //const data = window.$patients;
  // const data = window.$patients;
  // console.log("test" + window.$patients);
  // console.log("location test" + data);

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //variable for list of patients
  state = {
    patients: [],
    patientsList: [],
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  componentDidMount() {
    // proxyurl = window.$proxyurl;
    // api = window.$api;
    axios
      .get(proxyurl + api)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
        this.setState({
          patientsList: [
            {
              id: this.state.patients.pid,
              name:
                this.state.patients.firstName +
                " " +
                this.state.patients.lastName,
              heartRate: 80,
              stressLevel: 10,
              img: circle,
            },

            {
              id: 2,
              name: "William Smith",
              heartRate: 120,
              stressLevel: 50,
              img: circle,
            },
            {
              id: 3,
              name: "Jennifer Johnson",
              heartRate: 100,
              stressLevel: 30,
              img: circle,
            },
          ],
        });
        console.log(this.state.patientsList[0]);

        //set the color/shape based on the stress level of the patients in the list
        for (let i = 0; i < this.state.patientsList.length; i++) {
          if (this.state.patientsList[i].stressLevel <= 10)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = circle;
              return {
                patientsList,
              };
            });
          else if (this.state.patientsList[i].stressLevel <= 30)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = triangle;
              return {
                patientsList,
              };
            });
          else if (this.state.patientsList[i].stressLevel <= 50)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = star;
              return {
                patientsList,
              };
            });
        }
      })
      .catch((error) => console.log("error", error));
  }

  //redirect the user to the "DetailedPatientInfo" page for the patient clicked, and transfer the patient data to that page.
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info",
      data: this.state.patients,
    });
  };

  render() {
    return (
      <div className="Location">
        <h1 className="header">Patient Location</h1>
        <div className="dot" onClick={this.handleSubmit}>
          {this.state.patientsList.map((patient) => (
            <p key={patient.id}>
              {patient.name}
              <img src={patient.img} />
            </p>
          ))}
          {/* <img src={this.state.patientsList[0].img} alt="circle" />
          <p>{this.state.patientsList[1].name}</p>
          <img src={this.state.patientsList[1].img} alt="circle" />
          <p>{this.state.patientsList[2].name}</p>
          <img src={this.state.patientsList[2].img} alt="circle" /> */}
        </div>
        <table className="grid">
          {/* this is the note displayed above the map on the right side */}
          <tbody>
            <tr>
              <td>
                <img src={circle} alt="circle" className="note" />
              </td>
              <td>
                <p className="txt">Low stress level</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src={triangle} alt="triangle" className="note" />
              </td>
              <td>
                <p className="txt">Medium stress level</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src={star} alt="star" className="note" />
              </td>
              <td>
                <p className="txt">High stress level</p>
              </td>
            </tr>
          </tbody>
        </table>
        <img src={map} alt="Map" className="map" />
      </div>
    );
  }
}
export default Location;
