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
    console.log("* Homepage")
    return <div className="Homepage">
        <h1 className="Homepage-header">Jobly</h1>
        <p className="Homepage-tagline">All the jobs in one convenient place!</p>
    </div>
}

export default Homepage;