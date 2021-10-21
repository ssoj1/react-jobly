import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from './api';
import { useState, useContext, useEffect } from "react"
import UserContext from './userContext';

/**
 * App component rendering navbar and routes
 * 
 * Props: None
 * State: None
 * 
 * App => {Navigation, Routes}
 */
function App() {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const [messageForForm, setMessageForForm] = useState("");

  console.log("* App");

  /** Accepts ProfileForm data, validates password. If valid updates
   * userData. Returns message.
   */
  async function handleEdit(updatedProfileInfo) {

    console.log("data with which we are updating", updatedProfileInfo)
    const response = await JoblyApi.updateUser(updatedProfileInfo);
    console.log("resp after update user", response)
    if (response.user !== undefined) {
      setUserData(response.user);
      return "Updated successfully";
    } else {
      setMessageForForm(response); // which will be an error message
    };
  }

  /** */
  async function handleLogin(username, password) {
    const response = await JoblyApi.checkUserCredentials(username, password);

    if (response.token !== undefined) {
      setToken(response.token);
    } else {
      setMessageForForm(response); // which will be an error message
    };
  }

  /** */
  async function handleSignUp(userData) {
    const response = await JoblyApi.registerUser(userData);
    console.log(" response is ", response);

    if (response.token !== undefined) {
      setToken(response.token);
    } else {
      setMessageForForm(response); // which will be an error message
    };
  }


  useEffect(function updateUserDataOnTokenChange() {
    console.log("in useEffect")
    async function updateUserData() {
      JoblyApi.token = token;
      console.log("token in userdata useffect", token);
      const userResponse = await JoblyApi.getUserByToken(token);
      console.log(" userResponse ", userResponse)
      setUserData(userResponse);

    }
    updateUserData();
  }, [token]);



  return (
    <div className="App bg-image container-fluid min-vh-100">
      <BrowserRouter>
        <Navigation />
        <UserContext.Provider value={userData}>
          <Routes
            handleEdit={handleEdit}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            messageForForm={messageForForm} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

// did profile form, did login form tbd if they work
// add conditional logic to Navbar
// add conditional logic to homepage
// do sign up / register form
