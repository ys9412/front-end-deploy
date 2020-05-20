import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import { Auth } from "aws-amplify";
import "./SignUp.css";

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    /* Checks that email and password are not empty */
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    /* If user successfuly signs up, prompts the message and redirect the user to login page */
    event.preventDefault();
    alert("You are successfully signed up. Please log in to use the website");
    props.history.push("/login");
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            /* save user input email to the variable email */
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            /* save user input password to the variable password */
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        {/* if the user input is no valid, diable the submit button */}
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
