import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";

import JobCard from "./JobCard";

/** Render Details of a given company
 * 
 * Props: 
 * - none
 * 
 * State: 
 * - isLoading
 * - company
 * 
 * Routes -> CompanyDetails -> JobCardList
 */
function CompanyDetails(){
    const [ isLoading, setIsLoading] = useState(true);
    const [ company, setCompany ] = useState({});

    const { handle } = useParams();

    useEffect(function fetchCompanyWhenMounted(){
        async function fetchCompany(){
            const companyResult = await JoblyApi.getCompany(handle);
            setCompany(companyResult);
            setIsLoading(false);
        }
        fetchCompany();
    }, []);

    if (isLoading) return <i>Loading...</i>; 

    return (
        <div className="CompanyDetails">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            {company.jobs.map(job => 
                <JobCard job={job} key={job.id} /> )
            }
        </div>
    );
}

export default CompanyDetails;