import {  Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import CompanyList from "./CompanyList";
import ProfileForm from "./ProfileForm";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

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
 function Routes({ handleSignUp, handleLogin, handleEdit }) {
    console.log("* Routes");
    // add slash profile, login, and signup
    // profile component => profile form
    //      takes form data updates user if valid
    // login component => login form
    //      takes form data and authenticates
    // signup component => signup form
    //      take form data, check if user exists/data valid, sign up
    return (
      <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/companies/:handle">
            {/* {loggedIn? <CompanyDetails />: Redirect(to'/") } */}
            <CompanyDetails />
          </Route>
          <Route exact path="/jobs">
            <JobList />
          </Route>
          <Route exact path="/companies">
            <CompanyList />
          </Route>
          <Route exact path="/login">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          <Route exact path="/signup">
            <SignUpForm handleSignUp={handleSignUp} />
          </Route>
          <Route exact path="/profile">
            <ProfileForm handleEdit={handleEdit} />
          </Route>
          <Redirect to="/" />
      </Switch>
    );
  };
  
  export default Routes;