import {useEffect, useState} from "react";
import CompanyCardList from "./CompanyCardList";
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
            {<CompanyCardList companies={companies}/>}
        </div>
    );

};

export default CompanyList;