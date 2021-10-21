import { NavLink } from "react-router-dom";
import "./Navigation.css"; 

/** Component for navigating
 *
 * Props:
 * - none
 *
 * State:
 * - none
 *
 * App -> Navigation -> NavLink
 */
function Navigation() {
  console.log("* Navigation");


  //has a ternary taht shows you diff links if 
  //logged in (companies,jobs, logout{name})
  // -- log out btn has event listener to log out user?
  //vs not(sign in / sign up) 

  return (
    <div className="row">
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
      </nav>
    </div>
  );
}

export default Navigation;