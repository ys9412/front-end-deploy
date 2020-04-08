import React, { Component } from "react";
import axios from "axios";
import "./Menu.css";
import location from "./images/SVG/location.svg";
import lookup from "./images/SVG/lookup.svg";
import add from "./images/SVG/add.svg";
import feedback from "./images/SVG/feedback.svg";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "http://ec2-52-91-80-144.compute-1.amazonaws.com/api/getbyid=1";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleMap = this.handleMap.bind(this);
    this.handleList = this.handleList.bind(this);
  }
  state = {
    patients: []
  };

  componentDidMount() {
    axios
      .get(proxyurl + api)
      .then(response => response.data)
      .then(result => {
        this.setState({ patients: result });
      })
      .catch(error => console.log("error", error));
  }

  handleMap = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./location",
      data: this.state.patients
    });
  };

  handleList = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "./patient_list",
      data: this.state.patients
    });
  };

  render() {
    return (
      <div className="Menu">
        <h1 className="header">UCI Medical Center Radiation Oncology</h1>
        <table className="menu">
          <tbody>
            <tr>
              <td>
                <a href="" onClick={this.handleMap}>
                  <img className="left" src={location} alt="Location logo" />
                </a>
              </td>
              <td>
                <a href="" onClick={this.handleList}>
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
