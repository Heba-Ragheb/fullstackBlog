/*import React, { useEffect, useState } from 'react'
import Header from './Header'
import Posts from './Posts'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  const[posts,setPosts]=useState([])
  useEffect(() => {
    fetch('http://localhost:400/post')/*.then(res=>{
      (res.json()).then(posts=>{
        setPosts(posts)
      })
    })
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(posts =>  setPosts(posts))
  })
  return (
    <div>
       
     { posts.length>0 && posts.map((post)=><Posts {...post}/>) }
    </div>
  )
}*/
import React, { useState, useEffect } from 'react';
import Posts from './Posts';

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Fetching data directly in the render function
  useEffect(() => {fetchPosts()},[])
  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:400/post');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const posts = await response.json();
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Fetching data when the component is first rendered
 /* if (posts.length === 0) {
    fetchPosts();
  }*/

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => <Posts key={post._id} {...post} />) // Assuming post has an _id field
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
