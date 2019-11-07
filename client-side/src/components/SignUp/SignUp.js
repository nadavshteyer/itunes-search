import React, {useState} from 'react';
import {Input, FormControl, InputLabel, Button} from '@material-ui/core';
import { Redirect } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signedUp, setSignedUp] = useState(false)

  const SignUp = (e) => {
    e.preventDefault();        
    fetch(`http://localhost:8080/signUp`,{
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        password,
      })
    }).then(res=>res.json()).then(data =>{
      setSignedUp(true)
    })
  }

  if(signedUp) return <Redirect to="/signin" />

  return (
    <div className={'signInRootDiv'}>
      <div>
        <FormControl>
          <InputLabel htmlFor="firstName">first Name</InputLabel>
          <Input name="firstName" id="firstName" onChange={(e)=>setFirstName(e.target.value)}/>      
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lastName">last Name</InputLabel>
          <Input name="lastName" id="lastName" onChange={(e)=>setLastName(e.target.value)}/>  
        </FormControl>
        {/* <label>First Name</label>
        <input type="text" name="firstName" required onChange={(e)=>setFirstName(e.target.value)}/>
        <label>Last Name</label>
        <input type="text" name="lastName" required onChange={(e)=>setLastName(e.target.value)}/> */}
      </div>
      <div>
        {/* <label>Email Address</label>
        <input type="email" name="email" required onChange={(e)=>setUsername(e.target.value)}/> */}
        <FormControl>
          <InputLabel htmlFor="username">username</InputLabel>
          <Input name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>  
        </FormControl>
      </div>
      <div>
        {/* <label>Password</label>
        <input type="password" name="password1" onChange={(e)=>setPassword(e.target.value)}/> */}
        <FormControl>
          <InputLabel htmlFor="password">password</InputLabel>
          <Input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>  
        </FormControl>
      </div>
      <Button type="submit" onClick={SignUp}>Sign Up</Button>
    </div>
  )
}