import React, {useState} from 'react';
import {useAuth} from '../../context/auth.js'
import { Link, Redirect } from "react-router-dom";
import './SignIn.css';

import { Input,InputLabel, FormControl,Button } from '@material-ui/core';

export default function SignIn() {

  const [isLoggedIn, setLoggedIn] = useState()
  const [isError, setIsError] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setAuthTokens } = useAuth();

  if (isLoggedIn) {
    return <Redirect to="/" /> //TODO: change
  }

  const SignIn = (e) => {
    e.preventDefault();    
    fetch(`http://localhost:8080/signIn?username=${username}&password=${password}`,{
      method: "Get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json()).then(shouldLogIn => {
      if(shouldLogIn) {
        setAuthTokens(username)
        setLoggedIn(true)
      }
      else setIsError(true)
    })
  }


  return (
      <div className={"signInRootDiv"}>
        <span>Please log in to use the site!</span>
        <div>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input  type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
          </FormControl>
        </div>
        <Button type="submit" onClick={SignIn}>Sign In</Button>
        <Link to="/signup">Don't have an account?</Link>
          { isError &&<span>The username or password provided were incorrect!</span> }
    </div>
  );
}