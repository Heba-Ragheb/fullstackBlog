import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
export default function Header() {
    
    const {setUserInfo,userInfo}=useContext(UserContext)
    //const { userInfo, setUserInfo } = useContext(UserContext);
  /* useEffect(() => {
        async function fetchUserInfo() {
          try {
            const response = await fetch('http://localhost:400/profile', {
              credentials: 'include',
            });
    
            if (response.ok) {
              const userInfo = await response.json();
              setUsername(userInfo.username);
            } else {
              console.error('Error fetching user info:', response.status);
            }
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        }
    
        fetchUserInfo();
      }, []);*/
    /**useEffect(() => {
       fetch('http://localhost:400/profile', {
         credentials: 'include'
       }).then(response => {
         if (response.ok) {
           response.json().then(userInfo => {
             setUsername(userInfo.username);
          });
         }
       });
      }, []);*/useEffect(() => {fetchProfile()}, []);
      async function fetchProfile(){
  fetch('http://localhost:400/profile', {
    credentials: 'include',
  })
    .then(response => {
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      } else {
        console.error('Error fetching user info:', response.status, response.statusText);
      }
    })
    .catch(error => {
      console.error('Error fetching user info:', error.message);
    })};

     // const token = document.cookie.split(';').find((item) => item.includes('token='));
     // const tokenValue = token ? token.split('=')[1] : '';
    
     /**  useEffect(() => {
        async function fetchUserInfo() {
          try {
             const response = await fetch('http://localhost:400/profile', {
              credentials: 'include',
              method: 'GET',
              headers: {
                Authorization: `Bearer ${tokenValue}`,
              },
            });
            if (response.ok) {
              const userInfo = await response.json();
              setUsername(userInfo.username);
            } else {
              console.error('Error fetching user info:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error fetching user info:', error.message);
          }
        }
        fetchUserInfo();
      }, []);*/
       // Adding an empty dependency array to ensure this runs only once when the component mounts
     /*  async function fetchUserInfo() {
        try {
           const response = await fetch('http://localhost:400/profile', {
            credentials: 'include',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          });
          if (response.ok) {
            const userInfo = await response.json();
            setUsername(userInfo.username);
          } else {
            console.error('Error fetching user info:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user info:', error.message);
        }
  */
      
       function logout() {
        fetch('http://localhost:400/logout', {
          credentials: 'include',
          method: 'POST',
        
        }).then(() => {
          setUserInfo(null);
        });
      }
  
    const username = userInfo?.username
    return (
        <div>
            <div className="navbar">
            <Link to="/">Blog</Link>
                {username ? (
                    <div className="button">
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </div>
                ) : (
                    <div className="button">
                                
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
}