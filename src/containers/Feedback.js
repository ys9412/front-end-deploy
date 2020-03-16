import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { Auth } from "aws-amplify";
import "./Feedback.css";

export default function Feedback(props) {
  const [feedback, setFeedback] = useState("");

  function validateForm() {
    return feedback.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (feedback === undefined || feedback.length === 0)
      alert("ERROR: Feedback is empty");
    else {
      alert("Your feedback is submitted successfully. Thank you.");
      props.history.push("/menu");
      /**try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
    }**/
    }
  }

  return (
    <div className="Feedback">
      <form onSubmit={handleSubmit}>
        {/* <FormGroup controlId="content" bsSize="large">
          <ControlLabel className="title">Describe feedback.</ControlLabel>
          <textarea
            className="input"
            type="content"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
          />
        </FormGroup> */}
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
                  onChange={e => setFeedback(e.target.value)}
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
