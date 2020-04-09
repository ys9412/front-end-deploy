import React, { useState } from "react";
import axios from "axios";
import "./Location.css";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";
import triangle from "./images/SVG/triangle.svg";
import star from "./images/SVG/star.svg";

export default function Location(props) {
  //patient information that transferred from menu page.
  const { data } = props.location;
  const patients = [
    {
      id: 3,
      name: data.firstName + " " + data.lastName,
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
  ];

  //set the color/shape based on the stress level of the patients in the list
  for (let i = 0; i < patients.length; i++) {
    if (patients[i].stressLevel <= 10) patients[i].img = circle;
    else if (patients[i].stressLevel <= 30) patients[i].img = triangle;
    else if (patients[i].stressLevel <= 50) patients[i].img = star;
  }

  function myfunction() {
    console.log("Clicked");
  }

  //redirect the user to the "DetailedPatientInfo" page for the patient clicked, and transfer the patient data to that page.
  function handleSubmit(event) {
    event.preventDefault();
    props.history.push({
      pathname: "/detailed_patient_info",
      data: data,
    });
  }

  return (
    <div className="Location">
      <h1 className="header">Patient Location</h1>
      <div className="dot" onClick={handleSubmit}>
        <p>{patients[0].name}</p>
        <img src={patients[0].img} alt="circle" />
        <p>{patients[1].name}</p>
        <img src={patients[1].img} alt="circle" />
        <p>{patients[2].name}</p>
        <img src={patients[2].img} alt="circle" />
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
