
import React, { useState } from 'react'

export default function Register() {
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  async function Register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:400/register', {
        method: 'POST', // Make sure it's a POST request
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    
      
      });
      if(response.status!==  true){
        alert('registering done')
      }
      else{
        alert('couldnt register')
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  }
  return (
    <div>
                 <div className="main_box--main--login">
                  <form onSubmit={Register}>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="username"
              autoComplete="false"
              value={username}
              onChange={ev=> setUsername(ev.target.value)}
            />
            <input
              type="password"
              id="password"
              className="
              form-control"
              placeholder="password"
              value={password}
              onChange={ev=> setPassword(ev.target.value)}
            />
            <button className="btn btn-success" >
              Register
            </button>
    </form></div></div>
  )
}
