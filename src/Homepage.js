import "./Homepage.css";

/** Renders the homepage
 * 
 * Props: 
 * - none
 * 
 * State: 
 * - none
 * 
 * Routes -> Homepage 
 */
 function Homepage(){
    console.log("* Homepage");

    return (
        <div className="row min-vh-100 align-items-center">
            <div className="Homepage">
                <h1 className="Homepage-header">Jobly</h1>
                <p className="Homepage-tagline">All the jobs in one convenient place!</p>
            </div>
        </div>
    );
};

export default Homepage;