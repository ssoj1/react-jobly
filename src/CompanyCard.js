import {useState} from "react"
import { Link } from "react-router-dom";

/** Renders a list of companies
 * 
 * Props: 
 * - companyData
 * 
 * State: 
 *- none
 * 
 * Routes -> CompanyList -> CompanyCard
 */
 function CompanyCard({companyData}){
    console.log("* CompanyCard", companyData);

    return (
    <div className="CompanyCard">
        <Link to={`/companies/${companyData.handle}`}>
            <div className="CompanyCard-name">{companyData.name}</div>
            <img className="CompanyCard-img" 
                src={companyData.logoUrl} 
                alt={`${companyData.name} logo`}></img>
            <div className="CompanyCard-description">{companyData.description}</div>
        </Link>
    </div>
    )
};

export default CompanyCard;