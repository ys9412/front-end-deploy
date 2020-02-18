import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./DetailedPatientInfo.css";
import { Line } from "react-chartjs-2";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";

export default function DetailedPatientInfo(props) {
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
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [83, 90, 89, 95, 103, 107]
      },
      {
        label: "Stress level(sl)",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "red",
        borderWidth: 2,
        data: [42, 58, 53, 70, 82, 88]
      }
    ]
  };
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="DetailedInfo">
      <div className="basic">
        <h1 className="name">William Smith</h1>
        <p>DOB: 12/20/1959</p>
        <p>Sex: Male</p>
        <p>Heart rate: 118 bpm</p>
        <p>Stress level: 89 sl</p>
        <p>Waiting time: 25 minutes 13 seconds</p>
      </div>
      <Line
        className="chart"
        data={state}
        options={{
          title: {
            display: true,
            text: "Heart Rate & Stress Level",
            fontSize: 20
          },
          legend: {
            display: true,
            position: "right"
          }
        }}
      />
    </div>
  );
}
