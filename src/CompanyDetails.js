import { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import UserContext from "./userContext";

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
function CompanyDetails() {


    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    console.log("* ComanyDetails");
    const { handle } = useParams();
    const userData = useContext(UserContext);

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            const companyResult = await JoblyApi.getCompany(handle);
            setCompany(companyResult);
            setIsLoading(false);
        }
        fetchCompany();
    }, [handle]);


    if (!userData) {
        return <Redirect to="/" />
    }

    if (isLoading) return <i>Loading...</i>;

    return (
        <div className="CompanyDetails">
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetails;