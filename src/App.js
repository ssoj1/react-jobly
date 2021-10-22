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

  console.log("* App");

  /** Accepts ProfileForm data, validates password. If valid updates
   * userData. Returns message.
   */
  async function handleEdit(updatedProfileInfo) {

    const response = await JoblyApi.updateUser(updatedProfileInfo);
    return response.user;
  }

  /** */
  async function handleLogin(username, password) {
    const token = await JoblyApi.checkUserCredentials(username, password);
      setToken(token);
  }

  /** */
  async function handleSignUp(userData) {
    const token = await JoblyApi.registerUser(userData);
    setToken(token);
  }


  useEffect(function updateUserDataOnTokenChange() {
    async function updateUserData() {
      JoblyApi.token = token;
      const userResponse = await JoblyApi.getUserByToken(token);
      setUserData(userResponse);
    }
    updateUserData();
  }, [token]);



  return (
    <div className="App bg-image container-fluid min-vh-100">
      <BrowserRouter>
        <UserContext.Provider value={userData}>
          <Navigation />
          <Routes
            handleEdit={handleEdit}
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
          />
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
