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
function CompanyCard({ company }) {
    console.log("* CompanyCard", company);

    const logoNumber = Math.floor(Math.random() * 4) + 1;
    const companyLogo = `/logo${logoNumber}.png`;

    return (
        <div className="row justify-content-center">
            <div className="CompanyCard m-2 bg-white col-8">
                <Link to={`/companies/${company.handle}`}
                    className="text-decoration-none text-dark">
                    <div className="CompanyCard-name">{company.name}</div>
                    <img className="CompanyCard-img"
                        src={companyLogo}
                        alt={`${company.name} logo`}></img>
                    <div className="CompanyCard-description">{company.description}</div>
                </Link>
            </div>
        </div>
    );
};

export default CompanyCard;