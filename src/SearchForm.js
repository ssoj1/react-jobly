import { useState } from "react";

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

const INITIAL_STATE = {
  name: "",
}

function SearchForm( { updateSearchTerm } ) {
  const [formData, setFormData] = useState({});

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
    setFormData(INITIAL_STATE);
  }

  return (
      <form className="NewTodoForm" onSubmit={handleSubmit}>

        <div className="form-group">
          <input
              id="newTodo-title"
              name="title"
              className="form-control"
              placeholder="Title"
              onChange={handleChange}
              value={formData.title}
              aria-label="Title"
          />
        </div>

        <div className="form-group">
          <textarea
              id="newTodo-description"
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              aria-label="Description"
          />
        </div>

        <div className="form-group d-flex justify-content-between">
          <div className="w-75 d-flex justify-content-between">
            <label htmlFor="newTodo-priority"
                  className="d-inline-flex">Priority:&nbsp;&nbsp;
            </label>
            <select id="newTodo-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-flex"
            >
              <option value={1}>Ultra-Über</option>
              <option value={2}>Über</option>
              <option value={3}>Meh</option>
            </select>
          </div>
          <button className="btn-primary rig btn btn-sm NewTodoForm-addBtn">
            Gø!
          </button>
        </div>

      </form>
  );
}

export default TodoForm;