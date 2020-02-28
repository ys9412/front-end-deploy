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
            <td colspan="3">
              <p>First Name:</p>
            </td>
            <td colspan="3">
              <p>Last Name:</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <input type="text" className="longInput" />
            </td>
            <td colspan="3">
              <input type="text" className="longInput" />
            </td>
          </tr>

          <tr>
            <td colspan="6">
              <p>Sex:</p>
            </td>
          </tr>
          <tr>
            <td colspan="6">
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
            <td colspan="6">
              <p>Date of Birth:</p>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <label className="month">Month</label>
              <input type="text" placeholder="(1-12)" className="dob" />
            </td>
            <td colspan="2">
              <label className="day">Day</label>
              <input type="text" placeholder="(1-31)" className="dob" />
            </td>
            <td colspan="2">
              <label className="year">Year</label>
              <input type="text" placeholder="(1900-2020)" className="dob" />
            </td>
          </tr>
        </table>
      </form>
      <input type="submit" value="Submit" className="submit" />
    </div>
  );
}
