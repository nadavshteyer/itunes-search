import React, {useState} from 'react';
import './App.css';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';
import { AuthContext } from "./context/auth";
import SignIn from './components/SignIn/SignIn.js'
import signUp from './components/SignUp/SignUp.js'
import SearchPage from './components/SearchPage/SearchPage.js'


function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    setAuthTokens(data);
  }
  const logOut = () => {
    setAuthTokens();
  }

  
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div id={'root'}>
          <div className={'header'}>
            <div>
              <Link to="/">Search Panel</Link>
            </div>
            <div className={'signInAndOut'}>
              <div>
                <Link to="/signin">Sign In</Link>
              </div>
              <div >
                <span onClick={logOut}>Log Out</span>
              </div>
            </div>
          </div>
          {/* <Route exact path="/" component={SearchPage} /> */}
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={signUp} />
          <PrivateRoute path="/" exact component={SearchPage} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;




