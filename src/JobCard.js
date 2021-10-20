
/** Renders a single job
 * 
 * Props: 
 * - job
 * 
 * State: 
 *- none
 * 
 * Routes -> CompanyList -> CompanyCard
 */
 function JobCard({job}){
    console.log("* JobCard", {job});

    return (
    <div className="JobCard">
        <b>{job.title}</b>
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity}</p>
    </div>
    )
};

export default JobCard;