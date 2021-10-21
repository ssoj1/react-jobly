import './App.css';
import Navigation from './Navigation';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

/**
 * App component rendering navbar and routes
 * 
 * Props: None
 * State: None
 * 
 * App => {Navigation, Routes}
 */
function App() {
  console.log("* App");

  //function created to handle submit of sign up AND log in forms
  //once those are submitted in a valid way, update context for all
  //the pieces to know there is a logged in user
  // on re-render, navigation routes should now show 

  return (
    <div className="App bg-image container-fluid min-vh-100">
      <BrowserRouter>
        <Navigation />
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
