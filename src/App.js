import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter,Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import JoblyApi from './api';
import {useState, useContext} from "react"
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
  async function handleEdit(updatedProfileInfo){
    
    const response = await JoblyApi.updateUser(updatedProfileInfo); 
      if ( response.user !== undefined ) {
        setUserData(response.user);
        return "Updated successfully";
      } else {
        return response; // which will be an error message
      }; 
  }

  async function handleLogin(username,password){
    
    const response = await JoblyApi.checkUserCredentials(username,password); 
      if ( response.token !== undefined ) {
        const userResponse = await JoblyApi.getUser(username);
        setToken(response.token);
        setUserData(userResponse);
        return (
          <Redirect push to="/"/>
        );
      } else {
        return response; // which will be an error message
      }; 
  }




  //function created to handle submit of sign up AND log in forms
  //once those are submitted in a valid way, update context for all
  //the pieces to know there is a logged in user
  // on re-render, navigation routes should now show 

  return (
    <div className="App bg-image container-fluid min-vh-100">
      <BrowserRouter>
        <Navigation />
      <UserContext.Provider value={userData}>
        <Routes handleEdit={handleEdit} handleLogin={handleLogin}/>
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
