import React, { useState } from "react";
import Input from "react-phone-number-input/input";
import "./AddPatient.css";
import axios from "axios";

const api = "https://lachesisfitbit.com/api/uploadPatientsByJSON";
const apiConnect = "https://lachesisfitbit.com/api/uploadConnectById";

export default function AddPatient(props) {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [phoneNumber, setNumber] = useState();
  const [sex = "Female", setSex] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [fid, setFid] = useState();
  const [start, setStart] = useState();
  const [finish, setFinish] = useState();

  let gender;

  //validate input information. If user input is not valid, prompt error message.
  //Otherwise, prompt success message and redirect the user to menu page.
  function handleSubmit(event) {
    event.preventDefault();
    const errors = [];
    if (first === undefined || first.length === 0) {
      errors.push("First name is required");
    }
    if (last === undefined || last.length === 0) {
      errors.push("Last name is required");
    }
    if (sex === undefined || sex.length === 0) {
      errors.push("Sex is required");
    }
    if (month === undefined || month > 12 || month < 1 || isNaN(month)) {
      errors.push("Month is not valid");
    }
    if (day === undefined || day > 31 || day < 1 || isNaN(day)) {
      errors.push("Day is not valid");
    }
    if (year === undefined || year > 2020 || year < 1 || isNaN(year)) {
      errors.push("Year is not valid");
    }
    if (weight === undefined || weight <= 0 || isNaN(weight)) {
      errors.push("Weight is not valid");
    }
    if (height === undefined || height <= 0 || isNaN(height)) {
      errors.push("Height is not valid");
    }
    if (phoneNumber === undefined || phoneNumber.length === 0) {
      errors.push("Phone number is required");
    }
    if (fid === undefined || fid.length === 0) {
      errors.push("Fitbit ID is required");
    }
    if (errors.length > 0) alert(errors);
    else {
      alert(
        "New patient " +
          first +
          " " +
          middle +
          " " +
          last +
          " (" +
          sex +
          ", " +
          weight +
          " lbs, " +
          height +
          " ft, " +
          day +
          "/" +
          month +
          "/" +
          year +
          ", " +
          phoneNumber +
          ", " +
          fid +
          ") is added to the system."
      );
      props.history.push("/menu");
    }

    gender = sex === "Female" ? 0 : 1;
    const patient = {
      mid: phoneNumber.substring(phoneNumber.length - 4),
      dobyear: year,
      dobmonth: month,
      dobday: day,
      firstName: first,
      middleName: middle,
      lastName: last,
      weight: weight,
      height: height,
      gender: gender,
    };

    const date = new Date();
    const time =
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      ":" +
      date.getMilliseconds();
    console.log("time" + date);
    const connect = {
      fid: fid,
      pid: 1,
      matchId: phoneNumber.substring(phoneNumber.length - 4),
      //get current time
      start: date,
      finish: finish,
    };

    console.log(patient);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(patient);
    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    //send new patient data to backend
    fetch("https://lachesisfitbit.com/api/uploadPatientsByJSON", requestOptions)
      .then((response) => {
        response.text();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setTime(connect);
  }

  //bind mobile ID and fitbit ID with patient
  function setTime(connect) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(connect);
    console.log("content" + raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiConnect, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="info">
      <form onSubmit={handleSubmit}>
        <h1>New Patient Form</h1>
        <table id="form_table">
          <tbody>
            <tr>
              <td colSpan="2">
                <p>First Name:</p>
              </td>
              <td colSpan="2">
                <p>Middle Name:</p>
              </td>
              <td colSpan="2">
                <p>Last Name:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setFirst(e.target.value)}
                />
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setMiddle(e.target.value)}
                />
              </td>
              <td colSpan="2">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setLast(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <p>Sex:</p>
              </td>
            </tr>

            <tr>
              <td colSpan="6">
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p>Weight:</p>
              </td>
              <td colSpan="3">
                <p>Height:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <input
                  type="text"
                  className="weight"
                  onChange={(e) => setWeight(e.target.value)}
                />
                ft/in
              </td>
              <td colSpan="3">
                <input
                  type="text"
                  className="height"
                  onChange={(e) => setHeight(e.target.value)}
                />
                lbs.
              </td>
            </tr>
            <tr>
              <td colSpan="6">
                <p>Date of Birth:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label className="month">MM</label>
                <input
                  type="text"
                  placeholder="(1-12)"
                  className="dob"
                  onChange={(e) => setMonth(e.target.value)}
                />
              </td>
              <td colSpan="2">
                <label className="day">DD</label>
                <input
                  type="text"
                  placeholder="(1-31)"
                  className="dob"
                  onChange={(e) => setDay(e.target.value)}
                />
              </td>
              <td colSpan="2">
                <label className="year">YYYY</label>
                <input
                  type="text"
                  placeholder="(1900-2020)"
                  className="dob"
                  onChange={(e) => setYear(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <p>Cell Phone Number:</p>
              </td>
              <td colSpan="3">
                <p>Fitbit Device ID:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Input
                  className="phone"
                  country="US"
                  value={phoneNumber}
                  onChange={setNumber}
                />
              </td>
              <td colSpan="3">
                <input
                  type="text"
                  className="fID"
                  onChange={(e) => setFid(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Submit" className="submit" />
      </form>
    </div>
  );
}
