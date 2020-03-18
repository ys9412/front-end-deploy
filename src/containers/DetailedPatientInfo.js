import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./DetailedPatientInfo.css";
import { Line, Bar } from "react-chartjs-2";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";

export default function DetailedPatientInfo(props) {
  const { data } = props.location;
  const state = {
    labels: [
      "0 (min)",
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80
    ],
    datasets: [
      {
        label: "Heart rate(bpm)",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [83, 90, 89, 95, 103, 107]
      },
      {
        label: "Stress level(sl)",
        backgroundColor: "rgba(255, 246, 143, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [42, 58, 53, 70, 82, 88]
      }
    ]
  };

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
      "LA4"
    ],
    datasets: [
      {
        label: "Waiting time (min)",
        backgroundColor: "rgba(190, 144, 212,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [12, 10, 6.5, 3, 0, 7]
      }
    ]
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="DetailedInfo">
      <div className="basic">
        <h1 className="name">
          {data.firstName + " "}
          {data.lastName}
        </h1>
        <p>DOB: {data.dobmonth + "/" + data.dobday + "/" + data.dobyear}</p>
        <p>Sex: Male</p>
        <p>Heart rate: 118 bpm</p>
        <p>Stress level: 89 sl</p>
        <p>Waiting time: 25 minutes 13 seconds</p>
      </div>
      <Bar
        className="heart_rate_chart"
        data={state}
        width={60}
        height={30}
        options={{
          title: {
            display: true,
            text: "Heart Rate & Stress Level",
            fontSize: 20
          },
          legend: {
            display: true,
            position: "bottom"
          }
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
            fontSize: 20
          },
          legend: {
            display: true,
            position: "bottom"
          }
        }}
      />
    </div>
  );
}
