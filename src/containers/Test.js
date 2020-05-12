import React, { Component } from "react";
import axios from "axios";

const heartRateApi = "https://lachesisfitbit.com/api/recentFitbit=";

// /getAllbyfid=1
// /recentFitbit=1
// /updateConnect
// return class from binding is patients_fitbit connection
// /getActivePatients

class Test extends Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    //this.openPanel = this.openPanel.bind(this);
  }

  //variable for list of patients
  state = {
    heartRate: [],
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
    // for (let i = 1; i < 4; i++) {
    //   axios
    //     .get(heartRateApi + i.toString())
    //     .then((response) => response.data)
    //     .then((result) => {
    //       this.setState({ heartRate: this.state.heartRate.concat(result) });
    //       console.log(this.state.heartRate);
    //     })

    //     .catch((error) => console.log("error", error));
    // }
    axios
      .get(heartRateApi + "1")
      .then((response) => response.data)
      .then((result) => {
        this.setState({ heartRate: result });
        console.log("pid 1 Heartrate:" + this.state.heartRate.heartrate);
      })

      .catch((error) => console.log("error", error));
    // axios
    //   .get(heartRateApi + "2")
    //   .then((response) => response.data)
    //   .then((result) => {
    //     this.setState({ heartRate: this.state.heartRate.concat(result) });
    //     console.log("pid 2 Heartrate:" + this.state.heartRate.heartrate);
    //   })

    //   .catch((error) => console.log("error", error));
    // axios
    //   .get(heartRateApi + "3")
    //   .then((response) => response.data)
    //   .then((result) => {
    //     this.setState({ heartRate: this.state.heartRate.concat(result) });
    //     console.log("pid 3 Heartrate:" + this.state.heartRate.heartrate);
    //   })

    //   .catch((error) => console.log("error", error));

    //fetch patient list
    // axios
    //   .get(apiAll)
    //   .then((response) => response.data)
    //   .then((result) => {
    //     this.setState({ patients: result });
    //     console.log(this.state.patients[0]);
    //     //for (let i = 0; i < this.state.patients.length; i++) {
    //     for (let i = 0; i < 3; i++) {
    //       this.setState((state) => {
    //         const patients = state.patients;
    //         patients[i].stressLevel = 70;
    //         patients[i].heartRate = this.state.heartRate[i].heartrate;
    //         patients[i].img = green;
    //         patients[i].location = this.state.location[i].location;
    //         console.log("patient heart rate updated:" + patients[i].heartRate);
    //         if (patients[i].location === "RoomA") {
    //           patients[i].left = 57;
    //           patients[i].right = 44;
    //           patients[i].top = 120;
    //           // patients[i].bottom = 32;
    //           //145
    //         }
    //         if (patients[i].location === "RoomB") {
    //           patients[i].left = 62;
    //           patients[i].right = 39;
    //           patients[i].top = 120;
    //           // patients[i].bottom = 32;
    //         }
    //         if (patients[i].location === "Roomc") {
    //           patients[i].left = 58;
    //           patients[i].right = 43;
    //           patients[i].top = 100;
    //           // patients[i].bottom = 58;
    //         }
    //         return {
    //           patients,
    //         };
    //       });
    //     }
    //     console.log(this.state.patients);

    //set the color/shape based on the stress level of the patients in the list
    //         for (let i = 0; i < this.state.patients.length; i++) {
    //           if (this.state.patients[i].heartRate <= 70)
    //             this.setState((state) => {
    //               const patients = state.patients;
    //               patients[i].img = green;
    //               return {
    //                 patients,
    //               };
    //             });
    //           else if (this.state.patients[i].heartRate <= 85)
    //             this.setState((state) => {
    //               const patients = state.patients;
    //               patients[i].img = yellow;
    //               return {
    //                 patients,
    //               };
    //             });
    //           else if (this.state.patients[i].heartRate >= 85)
    //             this.setState((state) => {
    //               const patients = state.patients;
    //               patients[i].img = red;
    //               return {
    //                 patients,
    //               };
    //             });
    //         }
    //       })
    //       .catch((error) => console.log("error", error));
  }

  //redirect the user to the "DetailedPatientInfo" page for the patient clicked, and pass patient id as parameter in url.
  //   handleSubmit = (param) => (e) => {
  //     e.preventDefault();
  //     this.props.history.push({
  //       pathname: "/detailed_patient_info/" + param,
  //       data: this.state.patients,
  //     });
  //   };

  //   openPanel = (param) => (e) => {
  //     e.preventDefault();
  //     this.setState({ showPanel: true });
  //     this.setState({ currentId: param });
  //     for (let i = 0; i < this.state.patients.length; i++) {
  //       if (this.state.patients[i].pid === param) {
  //         this.setState({
  //           currentName:
  //             this.state.patients[i].firstName +
  //             " " +
  //             this.state.patients[i].lastName,
  //         });
  //         this.setState({
  //           currentHeartRate: this.state.patients[i].heartRate,
  //         });
  //       }
  //     }
  //   };

  render() {
    return (
      <div className="Test">
        <h1 className="header">Patient Location</h1>
        <p>{this.state.heartRate.heartrate}</p>
        {/* <img src={map} alt="Map" className="map" />
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
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}
export default Test;
