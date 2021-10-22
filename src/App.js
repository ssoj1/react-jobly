import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from './api';
import { useState, useEffect } from "react"
import UserContext from './userContext';

/**
 * App component rendering navbar and routes
 * 
 * Props: None
 * 
 * State: 
 * - userData
 * - token
 * - isLoading - boolean
 * 
 * App => {Navigation, Routes}
 */
function App() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  const [infoLoaded, setInfoLoaded] = useState(false);
  
  console.log("* App", { userData, token });

  /** Effect to update value of user data upon change of token
   * will run on login, signup, and data edit successes
   */
  useEffect(function updateUserDataOnTokenChange() {
    async function updateUserData() {
      if (token) {
        JoblyApi.token = token;
        const userResponse = await JoblyApi.getUserByToken(token);
        setUserData(userResponse);
      };
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    updateUserData();
  }, [token]);

  /** Accepts ProfileForm data, validates password. If valid updates
   * userData. Returns message.
   */
  async function handleEdit(updatedProfileInfo) {
    const token = await JoblyApi.checkUserCredentials(
                updatedProfileInfo.username, updatedProfileInfo.password);
    setToken(token);
    const response = await JoblyApi.updateUser(updatedProfileInfo);
    return response.user;
  }

  /** Accepts username and password, logs user in
  * sets token to received token on successful login
  */
  async function handleLogin(username, password) {
    const token = await JoblyApi.checkUserCredentials(username, password);
    console.log("about to set token")
    setToken(token);
    
  }

  /** Sets token to be an empty string
   * 
  */
  async function handleLogout() {
    setToken("");
  }

  /** Accepts userData for signup {username, firstname, lastname, email, password}, registers user
 * sets token to received token on successful login
 */
  async function handleSignUp(userData) {
    const token = await JoblyApi.registerUser(userData);
    setToken(token);
  }

  if (!infoLoaded) {
    return <i>Loading...</i>
  };

  return (
    <div className="App bg-image container-fluid min-vh-100">
      <BrowserRouter>
        <UserContext.Provider value={userData}>
          <Navigation handleLogout={handleLogout} />
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
