import CompanyCard from "./CompanyCard"
/** Renders a list of CompanyCards
 * 
 * Props: 
 * - companies: array of companies
 * 
 * State: 
 *- none
 * 
 * {CompanyList} -> CompanyCardList -> CompanyCard
 */
 function CompanyCardList({companies}){
    console.log("* CompanyCardList", {companies});
    console.log("handle of first",companies[0].handle);
    return (
    <div className="CompanyCardList">
        {companies.map(company => <CompanyCard key={company.handle} company={company}/>)}
    </div>
    )
};

export default CompanyCardList;