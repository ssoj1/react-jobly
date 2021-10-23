import "./Homepage.css";
import { useContext } from "react";
import UserContext from "./userContext";

/** Renders the homepage
 * 
 * Props: 
 * - none
 * 
 * State: 
 * - none
 * 
 * Context:
 * -userData
 * 
 * Routes -> Homepage 
 */
function Homepage() {
    console.log("* Homepage");

    const userData = useContext(UserContext);

    return (
        <div className="row min-vh-100 align-items-center">
            <div className="Homepage">
                <h1 className="Homepage-header">Jobly</h1>
                <p className="Homepage-tagline">
                    All the jobs in one convenient place!</p>
                {userData && <h2>Welcome back, {userData.firstName}</h2>}
            </div>
        </div>
    );
};

export default Homepage;