
/** Renders a single job
 * 
 * Props: 
 * - job -> obj of data on job
 * 
 * State: 
 *- none
 * 
 * JobCardList -> JobCard
 */
 function JobCard({job}){
    console.log("* JobCard", {job});

    return (
    <div className="JobCard">
        <b>{job.title}</b>
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity}</p>
    </div>
    );
};

export default JobCard;