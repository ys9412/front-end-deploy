import React, { Component } from "react";
import "./Menu.css";
import location from "./images/SVG/location.svg";
import lookup from "./images/SVG/lookup.svg";
import add from "./images/SVG/add.svg";
import feedback from "./images/SVG/feedback.svg";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleMap = this.handleMap.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  //function that transfers patient data to "Location" page
  handleMap = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./location",
      data: this.state.patients,
    });
  };

  //function that transfers patient data to "PatientList" page
  handleList = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./patient_list",
      data: this.state.patients,
    });
  };

  render() {
    return (
      <div className="Menu">
        <table className="menu">
          <tbody>
            <tr>
              <td>
                {/* <a href="" onClick={this.handleMap}> */}
                <a href="./location">
                  <img className="left" src={location} alt="Location logo" />
                </a>
              </td>
              <td>
                {/* <a href="" onClick={this.handleList}> */}
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
}
export default Menu;
