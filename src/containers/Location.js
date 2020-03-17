import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import "./Location.css";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";
import triangle from "./images/SVG/triangle.svg";
import star from "./images/SVG/star.svg";

export default function Location(props) {
  const patients = [
    {
      id: 1,
      name: "William Smith",
      heartRate: 120,
      stressLevel: 50,
      img: circle
    },
    {
      id: 2,
      name: "Jennifer Johnson",
      heartRate: 100,
      stressLevel: 30,
      img: circle
    },
    { id: 3, name: "James Brown", heartRate: 80, stressLevel: 10, img: circle }
  ];

  for (let i = 0; i < patients.length; i++) {
    if (patients[i].stressLevel <= 10) patients[i].img = circle;
    else if (patients[i].stressLevel <= 30) patients[i].img = triangle;
    else if (patients[i].stressLevel <= 50) patients[i].img = star;
  }

  function myfunction() {
    console.log("Clicked");
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.history.push("/detailed_patient_info");
    /**try {
        await Auth.signIn(email, password);
        props.userHasAuthenticated(true);
        props.history.push("/");
        } catch (e) {
        alert(e.message);
        }**/
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
