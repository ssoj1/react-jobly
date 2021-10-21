import { useState, useContext } from "react";
import UserContext from "./userContext";
import Alert from "./Alert";

/**
 * 
 */

    function LoginForm( { handleLogin }){
        
        const [formData, setFormData] = useState({});
        const [message, setMessage] = useState(null);
    
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
        setMessage(handleLogin(formData));
      }
    
      return (
        <div className="row justify-content-center pt-3">
          <form className="LoginForm col-8" onSubmit={handleSubmit}>
    
            <div className="form-group">
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
              <input type="password"
                  id="LoginForm-password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  value={userData.password}
                  aria-label="Password"
              />
            </div>
            { message 
            ? <Alert message={message} />
            : null
            }
            <div>
              <button className="btn-primary rig btn btn-sm ProfileForm-Button">
                Save Changes
              </button>
            </div>
    
          </form>
        </div>
      );
    }
export default LoginForm;