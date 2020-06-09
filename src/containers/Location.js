import React, { Component } from "react";
import axios from "axios";
import "./Location.css";
// import map from "./images/map_clear.jpeg";
import map from "./images/newMap.png";
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
const apiActive = "https://lachesisfitbit.com/api/getActivePatients";
const apiHeartRate = "https://lachesisfitbit.com/api/getbyfid=2";
const newLocationApi = "https://lachesisfitbit.com/api/getRecentLocationByMid=";
const apiHeartRateList = "https://lachesisfitbit.com/api/getAllActivebypid=";

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
    //5000
    this.getPatientList();
    this.getPatients();

    this.timer = setInterval(() => this.getPatients(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getPatientList() {
    axios
      .get(apiActive)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
      })

      .catch((error) => console.log("error", error));
  }

  getPatients() {
    //fetch heartrate data from fitbit device 1, 2, 3
    this.setState({ heartRate: [] });
    this.setState({ location: [] });

    // axios
    //   .get(apiActive)
    //   .then((response) => response.data)
    //   .then((result) => {
    //     this.setState({ patients: result });
    //     console.log("start patients" + this.state.patients[0].firstName);
    // console.log("patients" + this.state.patients[1].firstName);
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    for (let i = 1; i <= this.state.patients.length; i++) {
      this.setHeartRate(i);

      // axios
      //   .get(apiHeartRateList + this.state.patients[i - 1].pid)
      //   .then((response) => response.data)
      //   .then((result) => {
      //     console.log(
      //       "line 97" + apiHeartRateList + this.state.patients[i - 1].pid
      //     );
      //     let temp = result[result.length - 1];
      //     this.setState({ heartRate: this.state.heartRate.concat(temp) });
      //     console.log(
      //       "line 183 " +
      //         this.state.patients[i - 1].firstName +
      //         " " +
      //         this.state.heartRate[i - 1].heartrate
      //     );
      //     this.setState((state) => {
      //       const patients = state.patients;
      //       patients[i - 1].heartRate = this.state.heartRate[
      //         i - 1
      //       ].heartrate;
      //       if (patients[i - 1].heartRate <= 70)
      //         this.setState((state) => {
      //           const patients = state.patients;
      //           patients[i - 1].img = green;
      //           return {
      //             patients,
      //           };
      //         });
      //       else if (patients[i - 1].heartRate <= 85)
      //         this.setState((state) => {
      //           const patients = state.patients;
      //           patients[i - 1].img = yellow;
      //           return {
      //             patients,
      //           };
      //         });
      //       else if (patients[i - 1].heartRate >= 85)
      //         this.setState((state) => {
      //           const patients = state.patients;
      //           patients[i - 1].img = red;
      //           return {
      //             patients,
      //           };
      //         });
      //       return {
      //         patients,
      //       };
      //     });
      //     console.log("test" + this.state.patients);
      //   })

      //   .catch((error) => console.log("error", error));
      // console.log("mid: " + this.state.patients[i - 1].mid.toString());
      //----------------------------------------------------------------------------------------------------------------
      axios
        .get(newLocationApi + this.state.patients[i - 1].mid.toString())
        .then((response) => response.data)
        .then((result) => {
          console.log(
            "line 156: ",
            this.state.patients[i - 1].firstName,
            result
          );
          console.log("location loop: ", i - 1);
          let tempLocation = result;
          this.setState({ location: this.state.location.concat(result) });
          console.log("line 158", this.state.location);
          console.log("result.location: ", tempLocation.location);
          console.log("tempLocation.length: ", tempLocation.length);
          this.setState((state) => {
            const patients = state.patients;
            if (result !== "") {
              patients[i - 1].location = tempLocation.location;
              console.log("patient location: ", patients[i - 1].location);
              if (patients[i - 1].location === "RoomA") {
                this.setState((state) => {
                  const patients = state.patients;
                  patients[i - 1].left = 56 + count1 * 2;
                  patients[i - 1].right = 44;
                  patients[i - 1].top = 110;
                });
                count1++;
                // patients[i].bottom = 32;
                //145
              }
              if (patients[i - 1].location === "RoomB") {
                this.setState((state) => {
                  const patients = state.patients;
                  patients[i - 1].left = 61 + count2 * 2;
                  patients[i - 1].right = 39;
                  patients[i - 1].top = 110;
                });
                count2++;
                // patients[i].bottom = 32;
              }
              if (patients[i - 1].location === "RoomC") {
                this.setState((state) => {
                  const patients = state.patients;
                  patients[i - 1].left = 56 + count3 * 2;
                  patients[i - 1].right = 43;
                  patients[i - 1].top = 90;
                });
                count3++;
                // patients[i].bottom = 58;
              }
              if (patients[i - 1].location === "Waiting") {
                this.setState((state) => {
                  const patients = state.patients;
                  patients[i - 1].left = 33 + count4 * 2;
                  patients[i - 1].right = 45;
                  patients[i - 1].top = 87;
                });
                count4++;
              }
              if (patients[i - 1].location === "LN3") {
                this.setState((state) => {
                  const patients = state.patients;
                  patients[i - 1].left = 70 + count1 * 2;
                  patients[i - 1].right = 44;
                  patients[i - 1].top = 85;
                });
                count5++;
              }
            }

            if (result === "") {
              this.setState((state) => {
                const patients = state.patients;
                patients[i - 1].left = 56 + count1 * 2;
                patients[i - 1].right = 44;
                patients[i - 1].top = 110;
              });
              count1++;
            }

            return {
              patients,
            };
          });
          console.log("final patients: ", this.state.patients);
        })

        .catch((error) => console.log("error", error));
      //this.setLocation(i);
    }
    console.log("line 203: ", this.state.patients);
    console.log("line 207: ", this.state.heartRate[0], this.state.heartRate[1]);
    // })

    // .catch((error) => console.log("error", error));
  }

  setHeartRate(i) {
    axios
      .get(apiHeartRateList + this.state.patients[i - 1].pid)
      .then((response) => response.data)
      .then((result) => {
        console.log(
          "line 220 patients array length: ",
          this.state.patients.length
        );
        console.log(
          "line 223",
          apiHeartRateList,
          this.state.patients[i - 1].pid
        );
        console.log("heart rate loop: ", i - 1);

        let temp = result[result.length - 1];
        console.log("temp: ", temp);
        console.log("result: ", result);
        this.setState({ heartRate: this.state.heartRate.concat(temp) });
        console.log("heart rate array: ", this.state.heartRate);
        console.log("heart rate array i: ", i - 1, this.state.heartRate[i - 1]);

        this.setState((state) => {
          const patients = state.patients;
          if (result.length > 0) {
            patients[i - 1].heartRate = temp.heartrate;
            if (patients[i - 1].heartRate <= 70)
              this.setState((state) => {
                const patients = state.patients;
                patients[i - 1].img = green;
              });
            else if (patients[i - 1].heartRate <= 85)
              this.setState((state) => {
                const patients = state.patients;
                patients[i - 1].img = yellow;
              });
            else if (patients[i - 1].heartRate >= 85)
              this.setState((state) => {
                const patients = state.patients;
                patients[i - 1].img = red;
              });
          }

          if (result < 1)
            this.setState((state) => {
              const patients = state.patients;
              patients[i - 1].heartRate = 0;
              patients[i - 1].img = red;
            });
          return {
            patients,
          };
        });
        console.log(
          "line 275 patient list " +
            this.state.patients[0].firstName +
            this.state.patients[1].firstName
        );
      })

      .catch((error) => console.log("error", error));
    console.log("mid: " + this.state.patients[i - 1].mid.toString());
  }

  // setLocation(i) {
  //   axios
  //     .get(newLocationApi + this.state.patients[i - 1].mid.toString())
  //     .then((response) => response.data)
  //     .then((result) => {
  //       console.log(result);
  //       this.setState({ location: this.state.location.concat(result) });
  //       console.log("result" + this.state.location[i - 1].location);
  //       this.setState((state) => {
  //         const patients = state.patients;
  //         patients[i - 1].location = this.state.location[i - 1].location;
  //         if (patients[i - 1].location === "RoomA") {
  //           patients[i - 1].left = 56 + count1 * 2;
  //           patients[i - 1].right = 44;
  //           patients[i - 1].top = 110;
  //           count1++;
  //           // patients[i].bottom = 32;
  //           //145
  //         }
  //         if (patients[i - 1].location === "RoomB") {
  //           patients[i - 1].left = 61 + count2 * 2;
  //           patients[i - 1].right = 39;
  //           patients[i - 1].top = 110;
  //           count2++;
  //           // patients[i].bottom = 32;
  //         }
  //         if (patients[i - 1].location === "RoomC") {
  //           patients[i - 1].left = 56 + count3 * 2;
  //           patients[i - 1].right = 43;
  //           patients[i - 1].top = 90;
  //           count3++;
  //           // patients[i].bottom = 58;
  //         }
  //         if (patients[i - 1].location === "Waiting") {
  //           patients[i - 1].left = 33 + count4 * 2;
  //           patients[i - 1].right = 45;
  //           patients[i - 1].top = 87;
  //           count4++;
  //         }
  //         return {
  //           patients,
  //         };
  //       });
  //     })

  //     .catch((error) => console.log("error", error));
  // }

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
    const tempPatients = this.state.patients.slice(0, 3);
    return (
      <div className="Location">
        <h1 className="header">Patient Location</h1>
        <img src={map} alt="Map" className="map" />
        <div className="dot">
          {tempPatients.map((patient) => (
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
                  width: 4 + "%",
                  height: 4 + "%",
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
