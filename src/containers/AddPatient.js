import React, { useState } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import "./AddPatient.css";

export default function AddPatient(props) {
  const [sex, setSex] = useState();

  return (
    <div className="info">
      <form>
        <h1>New Patient Form</h1>
        <table id="form_table">
          <tr>
            <td>
              <p>Last Name:</p>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <p>First Name:</p>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <p>Sex:</p>
            </td>
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
            <td>
              <label>mm:</label>
              <input type="text" />
              <label>dd:</label>
              <input type="text" />
              <label>yyyy:</label>
              <input type="text" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
