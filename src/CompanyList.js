import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import CompanyCardList from "./CompanyCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import UserContext from "./userContext";

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
    const[isLoading,setIsLoading] = useState(true);
    const[searchTerm,setSearchTerm] = useState({});
    const[companies,setCompanies] = useState([]);
    console.log("* CompanyList ", { isLoading, searchTerm, companies });
    const userData = useContext(UserContext);

    /** Updates searchTerm based on form submission */
    function updateSearchTerm( searchTerm ){
        setSearchTerm(searchTerm);
        setIsLoading(true);
    };

    useEffect(function fetchCompaniesWhenMounted(){
        async function fetchCompanies(){
            const companiesResult = await JoblyApi.getCompanies(searchTerm.term);
            console.log({companiesResult})
            setCompanies(companiesResult);
            setIsLoading(false);
        }
        fetchCompanies();
    },[searchTerm]);

    if(Object.keys(userData).length === 0){
        return <Redirect to="/"/>
    }

    if (isLoading) return <i>Loading...</i>; 

    return (
        <div>
            {<SearchForm updateSearchTerm={updateSearchTerm} searchingBy="name" />}
            {<CompanyCardList companies={companies}/>}
        </div>
    );

};

export default CompanyList;