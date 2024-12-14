import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:400/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        alert('Could not login');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main_box--main--login">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          className="form-control"
          placeholder="Username"
          autoComplete="off"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          id="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button className="btn btn-success" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}
