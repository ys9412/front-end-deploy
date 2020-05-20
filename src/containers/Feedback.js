import React, { useState } from "react";
import { Button } from "react-bootstrap";
//import { Auth }, FormGroup, FormControl, ControlLabel  from "aws-amplify";
import "./Feedback.css";

export default function Feedback(props) {
  const [feedback, setFeedback] = useState("");

  function validateForm() {
    return feedback.length > 0;
  }

  //After user fills out feedback, prompt the message and redirect the user to menu page.
  //Need to work on saving feedback to database.
  function handleSubmit(event) {
    event.preventDefault();
    if (feedback === undefined || feedback.length === 0)
      alert("ERROR: Feedback is empty");
    else {
      alert("Your feedback is submitted successfully. Thank you.");
      props.history.push("/menu");
    }
  }

  return (
    <div className="Feedback">
      <form onSubmit={handleSubmit}>
        <table className="tableInput">
          <tbody>
            <tr>
              <td>Describe Feedback.</td>
            </tr>
            <tr>
              <td>
                <textarea
                  className="input"
                  type="content"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Submit Feedback Form
        </Button>
      </form>
    </div>
  );
}
