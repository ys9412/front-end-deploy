import React, { useState } from "react";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import "./AddPatient.css";

export default function AddPatient(props) {
  const [sex, setSex] = useState("");

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
              <label>
                <input
                  className="name"
                  type="radio"
                  value="Female"
                  onChange={e => setSex(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  className="name"
                  type="radio"
                  value="Male"
                  onChange={e => setSex(e.target.value)}
                />
                Male
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <p>Date of Birth:</p>
            </td>
            <td >
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
