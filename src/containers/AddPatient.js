import React, { useState } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import "./AddPatient.css";

export default function AddPatient(props) {
  const [sex, setSex] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [year, setYear] = useState();

  return (
    <div className="info">
      <form>
        <h1>New Patient Form</h1>
        <table id="form_table">
          <tr>
            <td>
              <p>Last Name:</p>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <p>First Name:</p>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <p>Sex:</p>
            </td>
          </tr>
          <tr>
            <td>
              <select value={sex}>
                <option value="Female" onSelect={e => setSex(e.target.value)}>
                  Female
                </option>
                <option value="Male" onSelect={e => setSex(e.target.value)}>
                  Male
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>Date of Birth:</p>
            </td>
          </tr>
          <tr>
            <td>
              <label className="month">Month</label>
              <input type="text" />

              <label className="day">Day</label>
              <input type="text" />

              <label className="year">Year</label>
              <input type="text" />
            </td>
          </tr>
        </table>
      </form>
      <input type="submit" value="Submit" className="submit" />
    </div>
  );
}
