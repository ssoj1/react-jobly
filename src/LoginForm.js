import { useState } from "react";
import Alert from "./Alert";
import { Redirect } from "react-router-dom";

/**Form to handle login of user
 * state: 
 *  - formData: {username, pw}
 *  - message: initially null
 *  - redirect required: to companies page on login
 * 
 * props:
 *  - handleLogin fxn: passed down from app
 * 
 * Context:
 * -none
 * 
 * Routes => Login Form => Alert if error
 * 
 */

function LoginForm({ handleLogin }) {

  const initialFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [redirectRequired, setRedirectRequired] = useState(false);

  console.log("* LoginForm ", {
    handleLogin,
    formData,
    message,
    redirectRequired
  });

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
    console.log("Check out state in Login Form ->", formData);
    try {
      await handleLogin(formData.username, formData.password);
      setRedirectRequired(true);
      console.log({redirectRequired})
    } catch (err) {
      setMessage(err);
    };
  }

  return (
    <div className="row justify-content-center pt-3">
      {
        redirectRequired && <Redirect push to="/companies" />
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
              value={formData.username}
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
              value={formData.password}
              aria-label="Password"
            />
          </div>
          {message && <Alert message={message} />}
          <div>
            <button className="btn-primary rig btn btn-sm ProfileForm-Button">
              Log In
            </button>
          </div>

        </form>
      }

    </div>
  );
}
export default LoginForm;