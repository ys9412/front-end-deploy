import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Menu from "./containers/Menu";
import Location from "./containers/Location";
import DetaildPatientInfo from "./containers/DetailedPatientInfo";
import PatientList from "./containers/PatientList";
import AddPatient from "./containers/AddPatient";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/location" exact component={Location} />
      <Route
        path="/detailed_patient_info"
        exact
        component={DetaildPatientInfo}
      />
      <Route path="/patient_list" exact component={PatientList} />
      <Route path="/add_patient" exact component={AddPatient} />
      <Route component={NotFound} />
    </Switch>
  );
}
