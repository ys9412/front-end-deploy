import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "./PatientList.css";

export default function PatientList(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.history.push("/detailed_patient_info");
  }
  return (
    <div className="list">
      <table id="tableInfo">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Waiting Time</th>
        </tr>
        <tr>
          <td>1</td>
          <td onClick={handleSubmit}>William Smith</td>
          <td>25 min 13 sec</td>
        </tr>
        <tr>
          <td>2</td>
          <td onClick={handleSubmit}>Jennifer Johnson</td>
          <td>20 min 3 sec</td>
        </tr>
      </table>
    </div>
  );
}
