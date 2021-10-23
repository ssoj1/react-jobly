import CompanyCard from "./CompanyCard";

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
function CompanyCardList({ companies }) {
    console.log("* CompanyCardList", { companies });

    return (
        <div className="CompanyCardList">
            {
                companies.length === 0
                    ? <p>No results found.</p>
                    : companies.map(company => <CompanyCard
                        key={company.handle}
                        company={company}
                    />)
            }
        </div>
    );
};

export default CompanyCardList;