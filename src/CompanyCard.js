import {useState} from "react"

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
        <div className="CompanyCard-name">{companyData.name}</div>
        <img className="CompanyCard-img" src={companyData.logoUrl} alt={`${companyData.name} logo`}></img>
        <div className="CompanyCard-description">{companyData.description}</div>
    </div>
    )
};

export default CompanyCard;