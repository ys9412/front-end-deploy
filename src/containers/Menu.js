import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
//import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import "./Menu.css";
import location from "./images/SVG/location.svg";
import lookup from "./images/SVG/lookup.svg";
import add from "./images/SVG/add.svg";
import feedback from "./images/SVG/feedback.svg";

export default function Menu(props) {
  function myfunction() {
    console.log("Clicked");
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.history.push("/menu");
  }

  return (
    <div className="Menu">
      <h1 className="header">UCI Medical Center Radiation Oncology</h1>
      <table id="icons">
        <tr>
          <tb>
            <a href="./location">
              <img src={location} alt="Location logo" className="icon" />
            </a>
          </tb>
          <tb>
            <a href="./patient_list">
              <img src={lookup} alt="Lookup logo" className="icon" />
            </a>
          </tb>
        </tr>
        <tr>
          <tb>
            <a href="./add_patient">
              <img src={add} alt="Add logo" className="icon" />
            </a>
          </tb>
          <tb>
            <a href="./location">
              <img src={feedback} alt="Feedback logo" className="icon" />
            </a>
          </tb>
        </tr>
      </table>
    </div>
  );
}
