import React, { Component } from "react";
import axios from "axios";
import "./Location.css";
// import map from "./images/map_clear.jpeg";
import map from "./images/newMap.svg";
import green from "./images/SVG/location_green.svg";
import yellow from "./images/SVG/location_yellow.svg";
import red from "./images/SVG/location_red.svg";
import location_black from "./images/SVG/location_black.svg";
import info_black from "./images/SVG/info_black.svg";
import heart_red from "./images/SVG/heart_red.svg";

import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardHeader,
  MDBContainer,
} from "mdbreact";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "https://lachesisfitbit.com/api/getbyid=1";
const heartRateApi = "https://lachesisfitbit.com/api/recentFitbit=";
const locationApi = "https://lachesisfitbit.com/api/getbylid=";
const apiAll = "https://lachesisfitbit.com/api/getAllPatients";
const apiActive = "https://lachesisfitbit.com/api//getActivePatients";
const apiHeartRate = "https://lachesisfitbit.com/api/getbyfid=2";
// /getAllbyfid=1
// /recentFitbit=1
// /updateConnect
// return class from binding is patients_fitbit connection
// /getActivePatients

class Location extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.openPanel = this.openPanel.bind(this);
  }

  //variable for list of patients
  state = {
    patients: [],
    heartRate: [],
    location: [],
    currentId: "",
    currentName: "",
    currentHeartRate: 0,
    showPanel: false,
    panel: "",
    //Room 1
    // left: 52 + "%",
    // top: 92 + "%",
    // padding: 500 + "%",
    //Room 2
    left: 57 + "%",
    top: 92 + "%",
    padding: 500 + "%",
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  componentDidMount() {
    // proxyurl = window.$proxyurl;
    // api = window.$api;
    this.getPatients();
    //5000
    this.timer = setInterval(() => this.getPatients(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getPatients() {
    //fetch heartrate data from fitbit device 1, 2, 3
    console.log("test interval");
    for (let i = 1; i < 4; i++) {
      axios
        .get(heartRateApi + i.toString())
        .then((response) => response.data)
        .then((result) => {
          this.setState({ heartRate: this.state.heartRate.concat(result) });
          console.log(this.state.heartRate);
        })

        .catch((error) => console.log("error", error));
    }

    //fetch lodation data from mobile phone 1, 2, 3
    for (let i = 1; i < 4; i++) {
      axios
        .get(locationApi + i.toString())
        .then((response) => response.data)
        .then((result) => {
          this.setState({ location: this.state.location.concat(result) });
          console.log(this.state.location);
        })

        .catch((error) => console.log("error", error));
    }

    //fetch patient list
    axios
      .get(apiAll)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
        console.log(this.state.patients[0]);
        //for (let i = 0; i < this.state.patients.length; i++) {
        for (let i = 0; i < 3; i++) {
          this.setState((state) => {
            const patients = state.patients;
            patients[i].stressLevel = 70;
            patients[i].heartRate = this.state.heartRate[i].heartrate;
            patients[i].img = green;
            patients[i].location = this.state.location[i].location;
            console.log("patient heart rate:" + patients[i].heartRate);
            if (patients[i].location === "RoomA") {
              patients[i].left = 57;
              patients[i].right = 44;
              patients[i].top = 120;
              // patients[i].bottom = 32;
              //145
            }
            if (patients[i].location === "RoomB") {
              patients[i].left = 62;
              patients[i].right = 39;
              patients[i].top = 120;
              // patients[i].bottom = 32;
            }
            if (patients[i].location === "Roomc") {
              patients[i].left = 58;
              patients[i].right = 43;
              patients[i].top = 100;
              // patients[i].bottom = 58;
            }
            return {
              patients,
            };
          });
        }
        console.log(this.state.patients);

        //set the color/shape based on the stress level of the patients in the list
        for (let i = 0; i < this.state.patients.length; i++) {
          if (this.state.patients[i].heartRate <= 70)
            this.setState((state) => {
              const patients = state.patients;
              patients[i].img = green;
              return {
                patients,
              };
            });
          else if (this.state.patients[i].heartRate <= 85)
            this.setState((state) => {
              const patients = state.patients;
              patients[i].img = yellow;
              return {
                patients,
              };
            });
          else if (this.state.patients[i].heartRate >= 85)
            this.setState((state) => {
              const patients = state.patients;
              patients[i].img = red;
              return {
                patients,
              };
            });
        }
      })
      .catch((error) => console.log("error", error));
  }

  //redirect the user to the "DetailedPatientInfo" page for the patient clicked, and pass patient id as parameter in url.
  handleSubmit = (param) => (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info/" + param,
      data: this.state.patients,
    });
  };

  openPanel = (param) => (e) => {
    e.preventDefault();
    this.setState({ showPanel: true });
    this.setState({ currentId: param });
    for (let i = 0; i < this.state.patients.length; i++) {
      if (this.state.patients[i].pid === param) {
        this.setState({
          currentName:
            this.state.patients[i].firstName +
            " " +
            this.state.patients[i].lastName,
        });
        this.setState({
          currentHeartRate: this.state.patients[i].heartRate,
        });
      }
    }
  };

  render() {
    const left = this.state.left;
    const top = this.state.top;
    //const tempPatients = this.state.patients.slice(0, 3);
    return (
      <div className="Location">
        <h1 className="header">Patient Location</h1>
        <img src={map} alt="Map" className="map" />
        <div className="dot">
          {this.state.patients.map((patient) => (
            <div
              key={patient.pid}
              className="patientLocation"
              onClick={this.openPanel(patient.pid)}
            >
              <p
                className="heartRateText"
                style={{
                  left: patient.left + "%",
                  right: patient.right + "%",
                  top: patient.top - 2 + "%",
                  // bottom: patient.bottom + "%",
                  position: "absolute",
                }}
              >
                {patient.heartRate + "bpm"}
              </p>
              <p
                style={{
                  left: patient.left + "%",
                  right: patient.right - 10 + "%",
                  top: patient.top + "%",
                  // bottom: patient.bottom + "%",

                  position: "absolute",
                }}
              >
                {patient.firstName + " " + patient.lastName}
              </p>

              <img
                src={patient.img}
                style={{
                  marginTop: 2 + "%",
                  marginBottom: 0,
                  width: 3 + "%",
                  height: 3 + "%",
                  left: patient.left + "%",
                  right: patient.right + "%",
                  top: patient.top + "%",
                  // bottom: patient.bottom + "%",

                  position: "absolute",
                }}
              />
            </div>
          ))}
        </div>
        <table className="grid">
          {/* this is the note displayed above the map on the right side */}
          <tbody>
            <tr>
              <td>
                <img src={green} alt="circle" className="note" />
              </td>
              <td>
                <p className="txt">Low stress level</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src={yellow} alt="triangle" className="note" />
              </td>
              <td>
                <p className="txt">Medium stress level</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src={red} alt="star" className="note" />
              </td>
              <td>
                <p className="txt">High stress level</p>
              </td>
            </tr>
          </tbody>
        </table>

        {this.state.showPanel ? (
          <MDBContainer className="panel">
            <MDBCard>
              <MDBCardHeader className="panelHeader">
                <p> Patient Id: {this.state.currentId}</p>
                <p> Name: {this.state.currentName}</p>
              </MDBCardHeader>
              <MDBCardBody className="panelBody">
                <MDBCardText>
                  <img src={heart_red} />
                  Heart Rate: {this.state.currentHeartRate}
                </MDBCardText>
                <MDBCardText
                  className="pInfo"
                  onClick={this.handleSubmit(this.state.currentId)}
                >
                  <img src={info_black} />
                  View Patient Info
                </MDBCardText>
                <MDBCardText className="pLocation">
                  <img src={location_black} />
                  View Location Details
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
export default Location;
