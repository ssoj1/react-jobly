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
 * Context: 
 * - userDataP
 * 
 * Routes -> CompanyList -> {CompanyCard, SearchForm}
 */
function CompanyList() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState({ name: "" });
    const [companies, setCompanies] = useState([]);
    const userData = useContext(UserContext);

    console.log("* CompanyList ", { isLoading, searchTerm, companies });

    /** Updates searchTerm based on form submission */
    function updateSearchTerm(searchTerm) {
        setSearchTerm(searchTerm);
        setIsLoading(true);
    };

    useEffect(function fetchCompaniesWhenMounted() {
        async function fetchCompanies() {
            const companiesResult = await JoblyApi.getCompanies(searchTerm.term);
            console.log({ companiesResult })
            setCompanies(companiesResult);
            setIsLoading(false);
        }
        fetchCompanies();
    }, [searchTerm]);

    console.log("user data in CompanyList is ", userData)

    if (!userData) {
        return <Redirect to="/" />
    };

    return (
        <div>
            {<SearchForm updateSearchTerm={updateSearchTerm} />}
            {
                isLoading
                    ? <i>Loading...</i>
                    : <CompanyCardList companies={companies} />
            }

        </div>
    );

};

export default CompanyList;