import React, { Component } from "react";
import "./DetailedPatientInfo.css";
import { Bar } from "react-chartjs-2";
import axios from "axios";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "https://lachesisfitbit.com/api/getbyid=";
const apiHeartRateList = "https://lachesisfitbit.com/api/getAllActivebypid=";

class DetailedPatientInfo extends Component {
  constructor(props) {
    super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  //variable for list of patients and the specific patient
  state = {
    patients: [],
    patient: [
      {
        firstName: "",
        lastName: "",
        dobmonth: "",
        dobday: "",
        dobyear: "",
      },
    ],
    heartRates: [],
    heartRate: [],
    stressLevel: [],
    time: ["0 sec"],
  };

  //function that retrieves data from backend server using RESTful API every time user opens this page
  //The retrieved data is saved to the variable "patients"
  componentDidMount() {
    const { patientId } = this.props.match.params;
    axios
      .get(api + patientId)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ patients: result });
      })
      .catch((error) => console.log("error", error));

    this.getHeartRate(patientId);
    //5000
    this.timer = setInterval(() => this.getHeartRate(patientId), 500000);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  getHeartRate(patientId) {
    console.log(apiHeartRateList + patientId);
    axios
      .get(apiHeartRateList + patientId)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ heartRates: result });
        for (let i = 0; i < this.state.heartRates.length; i++) {
          this.setState((state) => {
            let heartRate = state.heartRate;
            let time = state.time;
            let stressLevel = state.stressLevel;
            heartRate = heartRate.concat(this.state.heartRates[i].heartrate);
            time = time.concat((i + 1) * 5);
            stressLevel = stressLevel.concat(
              (this.state.heartRates[i].heartrate + this.state.time[i] / 12) / 2
            );
            return {
              heartRate,
              stressLevel,
              time,
            };
          });
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    // console.log("line 80: " + this.state.heartRates[0].fid);
    //if the patientId in patientsList matches with the patientId parameter from url, save the info in patient variable.
    {
      if (
        this.props.match.params.patientId !== undefined &&
        this.state.patients.pid !== undefined
      ) {
        if (
          this.state.patients.pid.toString() ===
          this.props.match.params.patientId.toString()
        ) {
          console.log("pid match");
          //this.setState({ firstName: this.state.patients.firstName });
          this.state.patient.firstName = this.state.patients.firstName;
          this.state.patient.lastName = this.state.patients.lastName;
          this.state.patient.dobmonth = this.state.patients.dobmonth;
          this.state.patient.dobday = this.state.patients.dobday;
          this.state.patient.dobyear = this.state.patients.dobyear;
        } else console.log("pid fail");
      }
    }

    const info = {
      labels: this.state.time,
      datasets: [
        {
          label: "Heart rate(bpm)",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 0.3,
          data: this.state.heartRate,
        },
        {
          label: "Stress level(sl)",
          backgroundColor: "rgba(255, 246, 143, 1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 0.3,
          data: this.state.stressLevel,
        },
      ],
    };

    //graph format for waiting time
    const room = {
      labels: [
        "Waiting",
        "Exam 1",
        "Exam 2",
        "Exam 3",
        "Exam 4",
        "Exam 5",
        "LA1",
        "LA2",
        "LA3",
        "LA4",
      ],
      datasets: [
        {
          label: "Waiting time (min)",
          backgroundColor: "rgba(190, 144, 212,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: [12, 10, 6.5, 3, 0, 7],
        },
      ],
    };
    return (
      <div className="DetailedInfo">
        <div className="basic">
          <h1 className="name">
            {this.state.patient.firstName + " "}
            {this.state.patient.lastName}
          </h1>
          <p>
            DOB:{" "}
            {this.state.patient.dobmonth +
              "/" +
              this.state.patient.dobday +
              "/" +
              this.state.patient.dobyear}
          </p>
          <p>Sex: Male</p>
          <p>Heart rate: 118 bpm</p>
          <p>Stress level: 89 sl</p>
          <p>Waiting time: 25 minutes 13 seconds</p>
        </div>
        <Bar
          className="heart_rate_chart"
          data={info}
          width={60}
          height={30}
          options={{
            title: {
              display: true,
              text: "Heart Rate & Stress Level",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
        <p className="break"></p>
        <Bar
          className="room_chart"
          data={room}
          width={60}
          height={30}
          options={{
            title: {
              display: true,
              text: "Time Spent at Each Room",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    );
  }
}
export default DetailedPatientInfo;
