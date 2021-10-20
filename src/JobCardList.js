import JobCard from "./JobCard";

/** Renders a list of jobcards
 * 
 * Props: 
 * - jobs: array of jobs
 * 
 * State: 
 *- none
 * 
 * {CompanyDetails,JobLIst} -> JobCardList -> JobCard
 */
 function JobCardList({jobs}){
    console.log("* JobCardList", {jobs});

    return (
    <div className="JobCardList">
        { 
            jobs.length === 0
            ? <p>No results found.</p>
            : jobs.map(job => <JobCard key={job.id} job={job}/>)
        }
        
    </div>
    );
};

export default JobCardList;