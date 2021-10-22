import { useState } from "react";
import Alert from "./Alert";
import { Redirect } from "react-router-dom";

/** Form for editing profile information
 * 
 * Props: 
 * - handleSignUp - function to run on parent
 * 
 * State: 
 * - formData
 * - message - success or failure message on submit
 * 
 * Context: 
 * - none
 * 
 * Routes -> SignUpForm
 * 
 */
function SignUpForm({ handleSignUp }) {
  const initialFormData={
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [redirectRequired, setRedirectRequired] = useState(false);

  console.log("* SignUpForm ", { handleSignUp, formData });

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
        handleSignUp(formData);
        setRedirectRequired(true);
    } catch(err) {
        setMessage(err);
    };
  }

  return (

    <div className="row justify-content-center pt-3">
      <h1>Sign Up</h1>
      {
        redirectRequired && <Redirect push to="/" />
      }
      {
        !redirectRequired &&
        <form className="SignUpForm col-8" onSubmit={handleSubmit}>
  
          <div className="form-group">
            <label htmlFor="SignUpForm-username">
              Username
            </label>
            <input
              id="SignUpForm-username"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={formData.username}
              aria-label="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-firstName">
              First Name
            </label>
            <input
              id="SignUpForm-firstName"
              name="firstName"
              className="form-control"
              onChange={handleChange}
              value={formData.firstName}
              aria-label="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-lastName">
              Last Name
            </label>
            <input
              id="SignUpForm-lastName"
              name="lastName"
              className="form-control"
              onChange={handleChange}
              value={formData.lastName}
              aria-label="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-email">
              Email
            </label>
            <input
              id="SignUpForm-email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              aria-label="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="SignUpForm-password">
              Password
            </label>
            <input type="password"
              id="SignUpForm-password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              aria-label="Submit"
            />
          </div>
          {message && <Alert message={message} />}
          <div>
            <button className="btn-primary rig btn btn-sm SignUpForm-Button">
              Submit
            </button>
          </div>
  
        </form>
      }
  
    </div>
  );
}




export default SignUpForm;