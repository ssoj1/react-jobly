import { NavLink } from "react-router-dom";
import "./Navigation.css"
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
  //active link css 
  return (
    <nav className="Navigation">
        <NavLink exact to="/" >
          Jobly
        </NavLink>
        <NavLink exact to="/companies" >
          Companies
        </NavLink>
        <NavLink exact to="/jobs" >
          Jobs
        </NavLink>
    </nav>
  );
}

export default Navigation;