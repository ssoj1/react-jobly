import { useState, useContext } from "react";
import UserContext from "./userContext";
import Alert from "./Alert";
import { Redirect } from "react-router-dom";

/** Form for editing profile information
 * 
 * Props: 
 * - handleEdit - function to run on parent
 * 
 * State: 
 * - formData
 * - message - success or failure message on submit
 * 
 * Context: 
 * - userData - an object like { username, firstName, lastName, email, isAdmin}
 * 
 * Routes -> ProfileForm -> Alert (on submit)
 * 
 */
function ProfileForm({ handleEdit }) {
  const userData = useContext(UserContext);

  const [formData, setFormData] = useState({
    ...userData,
    "password": "",
  });
  const [message, setMessage] = useState(null);
  const [debug,setDebug]=useState(Math.random());

  console.log("* ProfileForm ", { handleEdit, formData, message, debug });

  if (!userData) {
    return <Redirect to="/" />
  };

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("Check out state ->", formData);
    try {
      await handleEdit(formData);
      setMessage("Update Successful");
    } catch (err) {
      setMessage(err);
    };
  }

  return (
    <div className="row justify-content-center pt-3">
      <h1>Profile</h1>
      <form className="ProfileForm col-8" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="ProfileForm-username">
            Username
          </label>
          <input
            id="ProfileForm-username"
            name="username"
            className="form-control"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProfileForm-firstName">
            First Name
          </label>
          <input
            id="ProfileForm-firstName"
            name="firstName"
            className="form-control"
            onChange={handleChange}
            value={formData.firstName}
            aria-label="First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProfileForm-lastName">
            Last Name
          </label>
          <input
            id="ProfileForm-lastName"
            name="lastName"
            className="form-control"
            onChange={handleChange}
            value={formData.lastName}
            aria-label="Last Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProfileForm-email">
            Email
          </label>
          <input
            id="ProfileForm-email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProfileForm-password">
            Enter Password to Confirm
          </label>
          <input type="password"
            id="ProfileForm-password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
          />
        </div>
        {message && <Alert message={message}/>}
        <div>
          <button className="btn-primary rig btn btn-sm ProfileForm-Button">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProfileForm;