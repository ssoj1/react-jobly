import { useState, useContext, useEffect } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import { Redirect } from "react-router-dom";
import UserContext from "./userContext";

/** Renders a list of jobs
 * 
 * Props: 
 * - 
 * 
 * State: 
 * - isLoading
 * - searchTerm
 * - jobs - an array of objects like: 
 * [{ job }, {job},...]
 * 
 * Context:
 * -none
 * 
 * Routes -> JobList -> {SearchForm, JobCard}
 */
function JobList() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState({ title: "" });
    const [jobs, setJobs] = useState([]);
    const userData = useContext(UserContext);

    console.log("* JobList ", { isLoading, searchTerm, jobs });

    /** Updates searchTerm based on form submission */
    function updateSearchTerm(searchTerm) {
        setSearchTerm(searchTerm);
        setIsLoading(true);
    };

    useEffect(function fetchJobsWhenMounted() {
        async function fetchJobs() {
            const jobsResult = await JoblyApi.getJobs(searchTerm.term);
            console.log({ jobsResult })
            setJobs(jobsResult);
            setIsLoading(false);
        }
        fetchJobs();
    }, [searchTerm]);


    if (!userData) {
        return <Redirect to="/" />
    };

    return (
        <div>
            {<SearchForm
                updateSearchTerm={updateSearchTerm}
                searchingBy="title" />
            }
            {
                isLoading
                    ? <i>Loading...</i>
                    : <JobCardList jobs={jobs} />
            }
        </div>
    );

};

export default JobList;