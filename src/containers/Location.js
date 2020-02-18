import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import "./Location.css";
import map from "./images/map.jpg";
import circle from "./images/circle.svg";
import triangle from "./images/SVG/triangle.svg";
import star from "./images/SVG/star.svg";

export default function Location(props) {
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
      <img src={map} alt="Map" className="map" />
      <div className="dot" onClick={handleSubmit}>
        <p>William Smith</p>
        <img src={circle} alt="circle" />
        <p>Jennifer Johnson</p>
        <img src={circle} alt="circle" />
      </div>
      <Grid className="grid">
        <Row columns={2}>
          <Col>
            <img src={circle} alt="circle" className="img" />
          </Col>
          <Col>
            <p className="txt">Low stress level</p>
          </Col>
        </Row>
        <Row columns={2}>
          <Col>
            <img src={triangle} alt="triangle" className="img" />
          </Col>
          <Col>
            <p className="txt">Medium stress level</p>
          </Col>
        </Row>
        <Row columns={2}>
          <Col>
            <img src={star} alt="star" className="img" />
          </Col>
          <Col>
            <p className="txt">High stress level</p>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
