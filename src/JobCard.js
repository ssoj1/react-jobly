
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
    <div className="row justify-content-center">
        <div className="JobCard m-2 bg-white col-8">
            <p><b>{job.title}</b></p>
            <p className="pt-2 pb-0">Salary: { 
                job.salary 
                ? `$${job.salary.toLocaleString("en-us")}`
                : "Not Listed" }
            </p>
            <p className="pt-0">Equity: { 
                job.equity 
                ? `${job.equity}%`
                : "Not Listed" }
            </p>
        </div>
    </div>
    );
};

export default JobCard;