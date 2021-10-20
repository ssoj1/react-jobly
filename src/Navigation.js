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