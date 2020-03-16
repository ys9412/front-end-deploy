import React from "react";
import { useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "./PatientList.css";
import { render } from "@testing-library/react";

export default function PatientList(props) {
  const [contacts, setContacts] = useState();
  const [result, setResult] = useState();
  const [id, setId] = useState();
  const tests = [
    {
      id: 3,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
      }
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618"
        }
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains"
      }
    }
  ];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = null;

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  function componentDidMount() {
    fetch("http://54.174.170.217:8080/api/getbyid=1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
    // fetch("http://54.174.170.217:8080/")
    //   .then(res => res.json())
    //   .then(data => {
    //     setContacts({ contacts: data });
    //   })
    //   .catch(console.log);
    console.log("contacts" + contacts);
    //setResult(tests.map(test => test.id));
    //console.log("result" + result);
    //if (contacts != undefined) setId(contacts.map(contact => contact.id));
    //else console.log("contacts undefined");
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.history.push("/detailed_patient_info");
  }

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
            <td>1</td>
            <td onClick={handleSubmit}>William Smith</td>
            <td>25 min 13 sec</td>
          </tr>
          <tr>
            <td>2</td>
            <td onClick={handleSubmit}>Jennifer Johnson</td>
            <td>20 min 3 sec</td>
          </tr>
        </tbody>
        {componentDidMount()}
      </table>
    </div>
  );
}
