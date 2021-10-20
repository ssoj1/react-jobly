import { useState } from "react";

/** Form for searching.
 *
 * Props:
 * - updateSearchTerm - function to call on parent
 * - searchingBy
 *
 * State:
 * - formData: { searchCriteria }
 * 
 * { JobList, CompanyList } -> SearchForm
 */


function SearchForm( { updateSearchTerm, searchingBy } ) {
    const [formData, setFormData] = useState({});
    console.log("* SearchForm ", {updateSearchTerm, searchingBy });

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
    setFormData({});
  }

  return (
      <form className="SearchForm" onSubmit={handleSubmit}>

        <div className="form-group">
          <input
              id="SearchForm-term"
              name={searchingBy}
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
  );
}

export default SearchForm;