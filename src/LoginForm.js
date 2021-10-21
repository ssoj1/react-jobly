import { useState, useContext } from "react";
import UserContext from "./userContext";
import Alert from "./Alert";
import { Redirect } from "react-router-dom";

/**
 * 
 */

function LoginForm({ handleLogin, messageForForm }) {

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(messageForForm);
  const [redirectRequired, setRedirectRequired] = useState(false);

  console.log("* LoginForm ", { handleLogin, formData });

  const userData = useContext(UserContext);


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
    handleLogin(formData.username, formData.password);
    setMessage(messageForForm);
    setRedirectRequired(true);

  }

  return (
    <div className="row justify-content-center pt-3">
      {
        redirectRequired && <Redirect push to="/" />
      }
      {
        !redirectRequired && <form className="LoginForm col-8" onSubmit={handleSubmit}>

          <div className="form-group">
          <label htmlFor="LoginForm-username">
            Username
          </label>
            <input
              id="LoginForm-username"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={userData.username}
              aria-label="Username"
            />
          </div>
          <div className="form-group">
          <label htmlFor="LoginForm-password">
            Password
          </label>
            <input type="password"
              id="LoginForm-password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={userData.password}
              aria-label="Password"
            />
          </div>
          {message
            ? <Alert message={messageForForm} />
            : null
          }
          <div>
            <button className="btn-primary rig btn btn-sm ProfileForm-Button">
              Save Changes
            </button>
          </div>

        </form>
      }



    </div>
  );
}
export default LoginForm;