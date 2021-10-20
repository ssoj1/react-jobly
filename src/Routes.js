import {  Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import CompanyList from "./CompanyList";

/** Routes for App
 * 
 * Props: 
 * - none
 * 
 * State: 
 * - none
 * 
 * App -> Routes -> { Homepage, CompanyDetails, JobList, CompanyList}
 */
 function Routes() {
    console.log("* Routes");

    return (
      <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/companies/:handle">
            <CompanyDetails />
          </Route>
          <Route exact path="/jobs">
            <JobList />
          </Route>
          <Route exact path="/companies">
            <CompanyList />
          </Route>
          <Redirect to="/" />
      </Switch>
    );
  };
  
  export default Routes;