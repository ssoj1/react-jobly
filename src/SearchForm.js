import { useState } from "react";
import "./SearchForm.css";

/** Form for searching.
 *
 * Props:
 * - updateSearchTerm - function to call on parent
 *
 * State:
 * - formData: { searchCriteria }
 * 
 * { JobList, CompanyList } -> SearchForm
 */
function SearchForm( { updateSearchTerm } ) {
    const [formData, setFormData] = useState({ term: ""});
    console.log("* SearchForm ", {updateSearchTerm, formData });

  /** Update form input. */
  function handleChange(evt) { 
    const { name, value } = evt.target;
    setFormData(fData => ({
        ...fData,
        [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Check out state ->", formData);
    updateSearchTerm(formData);
  }

  return (
    <div className="row justify-content-center pt-3">
      <form className="SearchForm col-8" onSubmit={handleSubmit}>

        <div className="form-group">
          <input
              id="SearchForm-term"
              name="term"
              className="form-control"
              onChange={handleChange}
              value={formData.term}
              aria-label="Search Term"
          />
        </div>
        <div>
          <button className="btn-primary rig btn btn-sm SearchForm-Button">
            Search
          </button>
        </div>

      </form>
    </div>
  );
}

export default SearchForm;