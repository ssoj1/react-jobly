import { NavLink } from "react-router-dom";
import "./Navigation.css";
import UserContext from "./userContext";
import { useContext } from "react";

/** Component for navigating
 *
 * Props:
 * - handleLogout = function run on parent
 *
 * State:
 * - none
 * 
 * Context:
 * - userData - an object like { username, firstName, lastName, email, isAdmin}

 *
 * App -> Navigation -> NavLink
 */
function Navigation({ handleLogout }) {
  console.log("* Navigation");

  const userData = useContext(UserContext);

  // function handleClick(){
  //   handleLogout();
  // }

  return (
    <div className="row">
      {
        userData &&
        <nav className="Navigation bg-primary d-flex">
          <div className="mr-auto p-2">
            <NavLink exact to="/" >
              Jobly
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink exact to="/companies" >
              Companies
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink exact to="/jobs" >
              Jobs
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink exact to="/profile" >
              Profile
            </NavLink>
          </div>
          <div className="p-2">
            <button className="btn-link" onClick={handleLogout}>
              {`Logout ${userData.firstName}`}
            </button>
          </div>
        </nav>
      }
      {
        !userData &&
        <nav className="Navigation bg-primary d-flex">
          <div className="mr-auto p-2">
            <NavLink exact to="/" >
              Jobly
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink exact to="/login" >
              Log In
            </NavLink>
          </div>
          <div className="p-2">
            <NavLink exact to="/signup" >
              Sign Up
            </NavLink>
          </div>
        </nav>
      }
    </div>
  );
}

export default Navigation;