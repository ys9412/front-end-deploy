import React from "react";
import { Component } from "react";
import { useState } from "react";
import axios from "axios";
import "./PatientList.css";
import { render } from "@testing-library/react";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const api = "http://54.174.170.217:8080/api/getbyid=1";

class PatientList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    patients: []
  };
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // var raw = "";

  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   //body: raw,
  //   redirect: "follow"
  // };

  componentDidMount() {
    axios
      .get(proxyurl + api)
      .then(response => response.data)
      .then(result => {
        this.setState({ patients: result });
      })
      .catch(error => console.log("error", error));

    // fetch(proxyurl + api, requestOptions)
    //   .then(response => response.text())
    //   .then(
    //     result => console.log(result),
    //     result => (name = result.firstName)
    //   )
    //   .catch(error => console.log("error", error));

    // fetch("http://54.174.170.217:8080/")
    //   .then(res => res.json())
    //   .then(data => {
    //     setContacts({ contacts: data });
    //   })
    //   .catch(console.log);
    //console.log("result" + result);
    //setResult(tests.map(test => test.id));
    //console.log("result" + result);
    //if (contacts != undefined) setId(contacts.map(contact => contact.id));
    //else console.log("contacts undefined");
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/detailed_patient_info",
      data: this.state.patients
    });
  };

  render() {
    return (
      <div className="list">
        <table id="tableInfo">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.patients.pid}</td>
              <td onClick={this.handleSubmit}>
                {this.state.patients.firstName + " "}
                {this.state.patients.lastName}
              </td>
              <td>25 min 13 sec</td>
            </tr>
            <tr>
              <td>2</td>
              <td onClick={this.handleSubmit}>William Smith</td>
              <td>25 min 13 sec</td>
            </tr>
            <tr>
              <td>3</td>
              <td onClick={this.handleSubmit}>Jennifer Johnson</td>
              <td>20 min 3 sec</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PatientList;
