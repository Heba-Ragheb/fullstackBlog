import React , { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:400/profile', {
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        response.json().then(userInfo => {
          setUsername(userInfo.username);
       });
      }
    });
   }, [])
  return (
    <div>
      <div className="navbar">
        <h1>BLog</h1>
        <div className="button">
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
        </div>
      </div>
    </div>
  )
}
