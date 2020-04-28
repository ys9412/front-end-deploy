import React, { useState } from "react";
import Input from "react-phone-number-input/input";
import "./AddPatient.css";
import axios from "axios";

const api = "https://lachesisfitbit.com/api/uploadPatientsByJSON";

export default function AddPatient(props) {
  const [sex, setSex] = useState();
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();
  const [phoneNumber, setNumber] = useState();

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
    if (month === undefined || month > 12 || month < 1 || isNaN(month)) {
      errors.push("Month is not valid");
    }
    if (day === undefined || day > 31 || day < 1 || isNaN(day)) {
      errors.push("Day is not valid");
    }
    if (year === undefined || year > 2020 || year < 1 || isNaN(year)) {
      errors.push("Year is not valid");
    }
    if (phoneNumber === undefined || phoneNumber.length === 0) {
      errors.push("Phone number is required");
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
          day +
          "/" +
          month +
          "/" +
          year +
          phoneNumber +
          ") is added to the system."
      );
      props.history.push("/menu");
    }

    const patient = {
      mid: 3,
      dobyear: year,
      dobmonth: month,
      dobday: day,
      firstName: first,
      middleName: null,
      lastName: last,
      weight: 70,
      height: 175,
    };
    // axios.post(api, { patient }).then((res) => {
    //   console.log(res);
    //   console.log(res.data);
    // });

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

    fetch("https://lachesisfitbit.com/api/uploadPatientsByJSON", requestOptions)
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
              <td colSpan="2" className="inputHeight">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setFirst(e.target.value)}
                />
              </td>
              <td colSpan="2" className="inputHeight">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setMiddle(e.target.value)}
                />
              </td>
              <td colSpan="2" className="inputHeight">
                <input
                  type="text"
                  className="longInput"
                  onChange={(e) => setLast(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="inputHeight">
                <p>Sex:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="inputHeight">
                {/* I have trouble saving sex input, so need to work on that. */}
                <select value={sex}>
                  <option
                    value="Female"
                    onChange={(e) => setSex(e.target.value)}
                  >
                    Female
                  </option>
                  <option value="Male" onChange={(e) => setSex(e.target.value)}>
                    Male
                  </option>
                </select>
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
              <td colSpan="2" className="inputHeight">
                <label className="day">DD</label>
                <input
                  type="text"
                  placeholder="(1-31)"
                  className="dob"
                  onChange={(e) => setDay(e.target.value)}
                />
              </td>
              <td colSpan="2" className="inputHeight">
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
              <td colSpan="6">
                <p>Phone Number:</p>
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="inputHeight">
                <Input
                  className="phone"
                  country="US"
                  value={phoneNumber}
                  onChange={setNumber}
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
