import {useEffect, useState} from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";

/** Renders a list of companies
 * 
 * Props: 
 * - none
 * 
 * State: 
 * - isLoading
 * - searchTerm
 * - companies ([]) => ([{company}, {company}, ...])
 * 
 * Routes -> CompanyList -> {CompanyCard, SearchForm}
 */
 function CompanyList(){
    const[isLoading,setIsLoading]=useState(false);
    const[searchTerm,setSearchTerm]=useState({});
    const[companies,setCompanies]=useState([]);

    // need to make axios request to get list of all companies
    // when we are loading we will just show loading briefly
    // but then we will render search form + list of comapnies

    //define fxn here for form submission: set searchTerm to form Data

    useEffect(function fetchCompaniesWhenMounted(){
        async function fetchCompanies(){
            const companiesResult = await JoblyApi.getCompanies(searchTerm);
            setCompanies(companiesResult.data.companies)
        }
        fetchCompanies();
    },[searchTerm])



    return (
        <div>
            {/* <SearchForm handleSubmit={}/> */}
             {companies.map(company=><CompanyCard companyData={company}/>)}
        </div>
    )

}

export default CompanyList;