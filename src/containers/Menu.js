import React from "react";
//import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import "./Menu.css";
import location from "./images/SVG/location.svg";
import lookup from "./images/SVG/lookup.svg";
import add from "./images/SVG/add.svg";
import feedback from "./images/SVG/feedback.svg";

export default function Menu(props) {
  // function myfunction() {
  //   console.log("Clicked");
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   props.history.push("/menu");
  // }

  return (
    <div className="Menu">
      <h1 className="header">UCI Medical Center Radiation Oncology</h1>
      <table className="menu">
        <tbody>
          <tr>
            <td>
              <a href="./location">
                <img className="left" src={location} alt="Location logo" />
              </a>
            </td>
            <td>
              <a href="./patient_list">
                <img className="right" src={lookup} alt="Lookup logo" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="./add_patient">
                <img className="left" src={add} alt="Add logo" />
              </a>
            </td>
            <td>
              <a href="./feedback">
                <img className="right" src={feedback} alt="Feedback logo" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
