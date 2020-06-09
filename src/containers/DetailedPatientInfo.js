import React, { Component } from "react";
import "./DetailedPatientInfo.css";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "https://lachesisfitbit.com/api/getbyid=";
const apiHeartRateList = "https://lachesisfitbit.com/api/getAllActivebypid=";

//target heart rate:

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
    currenthr: [],
    stressLevel: [],
    waitingTime: [],
    temp: [],
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
    this.getHeartRateUpdated(patientId);
    //5000
    this.timer = setInterval(() => this.getHeartRateUpdated(patientId), 5000);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  // }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getHeartRate(patientId) {
    console.log("first fetch");
    axios
      .get(apiHeartRateList + patientId)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ heartRates: result });
        this.setState({
          currenthr: this.state.heartRates[this.state.heartRates.length - 1]
            .heartrate,
        });
        let dateFirst = new Date(this.state.heartRates[0].time);
        let dateLast = new Date(
          this.state.heartRates[this.state.heartRates.length - 1].time
        );
        let secondsFirst = dateFirst.getTime() / 1000;
        let secondsLast = dateLast.getTime() / 1000;
        let waiting = secondsLast - secondsFirst;
        let test = Math.floor(waiting / 60) + " min " + (waiting % 60) + " sec";
        this.setState({ waitingTime: this.state.waitingTime.concat(test) });
        console.log("api" + apiHeartRateList + patientId);

        for (let i = 0; i < this.state.heartRates.length; i++) {
          this.setState((state) => {
            let heartRate = state.heartRate;
            let time = state.time;
            let stressLevel = state.stressLevel;
            let totalSeconds = (i + 1) * 5;
            heartRate = heartRate.concat(this.state.heartRates[i].heartrate);
            time = time.concat(
              Math.floor(totalSeconds / 60) +
                " min " +
                (totalSeconds % 60) +
                " sec"
            );
            //(this.state.heartRates[i].heartrate + this.state.time[i] / 12) / 2
            stressLevel = stressLevel.concat(
              Math.ceil(this.state.heartRates[i].heartrate / 2)
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
  getHeartRateUpdated(patientId) {
    console.log("fetch new heart rate");
    axios
      .get(apiHeartRateList + patientId)
      .then((response) => response.data)
      .then((result) => {
        this.setState({ temp: result });
        let newHR = this.state.temp.slice(this.state.heartRates.length);
        this.setState({
          heartRates: this.state.heartRates.concat(newHR),
        });
        this.setState({
          currenthr: this.state.heartRates[this.state.heartRates.length - 1]
            .heartrate,
        });
        let dateFirst = new Date(this.state.heartRates[0].time);
        let dateLast = new Date(
          this.state.heartRates[this.state.heartRates.length - 1].time
        );
        let secondsFirst = dateFirst.getTime() / 1000;
        let secondsLast = dateLast.getTime() / 1000;
        let waiting = secondsLast - secondsFirst;
        let test = Math.floor(waiting / 60) + " min " + (waiting % 60) + " sec";
        this.setState({ waitingTime: this.state.waitingTime.concat(test) });
        for (let i = 0; i < newHR.length; i++) {
          this.setState((state) => {
            let heartRate = state.heartRate;
            let time = state.time;
            let stressLevel = state.stressLevel;
            let totalSeconds = (this.state.heartRates.length + i + 1) * 5;
            heartRate = heartRate.concat(newHR[i].heartrate);
            time = time.concat(
              Math.floor(totalSeconds / 60) +
                " min " +
                (totalSeconds % 60) +
                " sec"
            );
            stressLevel = stressLevel.concat(
              Math.ceil(this.state.heartRates[i].heartrate / 2)
            );
            return {
              heartRate,
              stressLevel,
              time,
            };
          });
        }
        console.log("sl: " + this.state.stressLevel);
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
    // let maxHR = Math.max(this.state.heartRate);
    // console.log("mxhr" + Math.max(this.state.heartRate));
    // const partition = {
    //   backgroundColor: "#F5DEB3",
    //   labels: this.state.time,
    //   datasets: [
    //     {
    //       label: "Heart rate(bpm)",
    //       backgroundColor: "rgba(75,192,192,1)",
    //       borderColor: "rgba(0,0,0,1)",
    //       borderWidth: 0.3,
    //       data: this.state.heartRate,
    //     },
    //     {
    //       label: "Stress level(sl)",
    //       backgroundColor: "rgba(255, 246, 143, 1)",
    //       borderColor: "rgba(0,0,0,1)",
    //       borderWidth: 0.3,
    //       data: this.state.stressLevel,
    //     },
    // {
    //   label: "Partition",
    //   backgroundColor: "rgba(141, 252, 209, 1)",
    //   borderColor: "rgba(36, 249, 168, 1)",
    //   borderWidth: 0.5,
    //   width: 20,
    //   data: [maxHR, maxHR, maxHR],
    // },
    //   ],
    // };

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
            {this.state.patients.firstName + " "}
            {this.state.patients.lastName}
          </h1>
          <p>
            DOB:{" "}
            {this.state.patients.dobmonth +
              "/" +
              this.state.patients.dobday +
              "/" +
              this.state.patients.dobyear}
          </p>
          <p>Sex: Male</p>
          <p>{"Heart rate: " + this.state.currenthr + " bpm"}</p>
          <p>
            {"Stress level: " +
              this.state.stressLevel[this.state.stressLevel.length - 1] +
              " sl"}
          </p>
          <p>
            {"Waiting time: " + this.state.time[this.state.time.length - 1]}
          </p>
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
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 180,
                  },
                },
              ],
            },
          }}
        />
        <p className="break"></p>
        {/* <Bar
          backgroundColor="lightblue"
          className="test"
          data={partition}
          width={60}
          height={30}
          options={{
            annotation: {
              annotations: [
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x-axis-0",
                  value: this.state.waitingTime[5],
                  borderColor: "red",
                  label: {
                    content: "TODAY",
                    enabled: true,
                    position: "top",
                  },
                },
              ],
            },
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
        /> */}
      </div>
    );
  }
}
export default DetailedPatientInfo;
