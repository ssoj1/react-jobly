import {useEffect, useState} from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
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
    const[isLoading,setIsLoading]=useState(true);
    const[searchTerm,setSearchTerm]=useState({});
    const[companies,setCompanies]=useState([]);
    console.log("* CompanyList ", { isLoading, searchTerm, companies });

    // need to make axios request to get list of all companies
    // when we are loading we will just show loading briefly
    // but then we will render search form + list of comapnies

    //define fxn here for form submission: set searchTerm to form Data

    /** Updates searchTerm based on form submission */
    function updateSearchTerm( searchTerm ){
        setSearchTerm(searchTerm);
        setIsLoading(true);
    };

    useEffect(function fetchCompaniesWhenMounted(){
        async function fetchCompanies(){
            const companiesResult = await JoblyApi.getCompanies(searchTerm);
            console.log({companiesResult})
            setCompanies(companiesResult);
            setIsLoading(false);
        }
        fetchCompanies();
    },[searchTerm]);

    console.log("companies are ", companies)
    if (isLoading) return <i>Loading...</i>; 

    return (
        <div>
            {<SearchForm updateSearchTerm={updateSearchTerm} searchingBy="name" />}
            {companies.map(company=><CompanyCard 
                companyData={company} 
                key={company.handle}/>)}
        </div>
    );

};

export default CompanyList;