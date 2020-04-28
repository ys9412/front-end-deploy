import React, { Component } from "react";
import axios from "axios";
import "./Location.css";
import map from "./images/map_clear.jpeg";
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
class Location extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.openPanel = this.openPanel.bind(this);
  }

  //variable for list of patients
  state = {
    patients: [],
    patientsList: [],
    currentId: "",
    currentName: "",
    showPanel: false,
    panel: "",
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  componentDidMount() {
    // proxyurl = window.$proxyurl;
    // api = window.$api;
    this.getPatients();
    this.timer = setInterval(() => this.getPatients(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getPatients() {
    console.log("test interval");
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
              img: green,
            },

            {
              id: 2,
              name: "William Smith",
              heartRate: 120,
              stressLevel: 50,
              img: green,
            },
            {
              id: 3,
              name: "Jennifer Johnson",
              heartRate: 100,
              stressLevel: 30,
              img: green,
            },
          ],
        });
        console.log(this.state.patientsList[0]);

        //set the color/shape based on the stress level of the patients in the list
        for (let i = 0; i < this.state.patientsList.length; i++) {
          if (this.state.patientsList[i].stressLevel <= 10)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = green;
              return {
                patientsList,
              };
            });
          else if (this.state.patientsList[i].stressLevel <= 30)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = yellow;
              return {
                patientsList,
              };
            });
          else if (this.state.patientsList[i].stressLevel <= 50)
            this.setState((state) => {
              const patientsList = state.patientsList;
              patientsList[i].img = red;
              return {
                patientsList,
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
    for (let i = 0; i < this.state.patientsList.length; i++) {
      if (this.state.patientsList[i].id === param)
        this.setState({
          currentName: this.state.patientsList[i].name,
        });
    }
    // if (this.state.showPanel) {
    //   console.log("success");
    //   this.setState({
    //     panel: (
    //       <MDBContainer className="panel">
    //         <MDBCard>
    //           <MDBCardHeader className="panelHeader">
    //             <p> Patient Id: {this.state.currentId}</p>
    //             <p> Name: {this.state.currentName}</p>
    //           </MDBCardHeader>
    //           <MDBCardBody className="panelBody">
    //             <MDBCardText>
    //               <img src={heart_red} />
    //               Heart Rate: 100 bpm
    //             </MDBCardText>
    //             <MDBCardText onClick={this.handleSubmit(this.state.currentId)}>
    //               <img src={info_black} />
    //               View Patient Info
    //             </MDBCardText>
    //             <MDBCardText>
    //               <img src={location_black} />
    //               View Location Details
    //             </MDBCardText>
    //           </MDBCardBody>
    //         </MDBCard>
    //       </MDBContainer>
    //     ),
    //   });
    // }
  };

  render() {
    return (
      <div className="Location">
        <h1 className="header">Patient Location</h1>
        <div className="dot">
          {this.state.patientsList.map((patient) => (
            <div
              key={patient.id}
              className="patientLocation"
              onClick={this.openPanel(patient.id)}
            >
              <p>{patient.name}</p>
              <img src={patient.img} />
            </div>
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
        <img src={map} alt="Map" className="map" />
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
                  Heart Rate: 100 bpm
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
