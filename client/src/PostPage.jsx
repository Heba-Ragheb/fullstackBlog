import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiPencilSquare } from "react-icons/hi2";
export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  async function getPost() {
    try {
      const response = await fetch(`http://localhost:400/post/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching post: ${response.status} ${response.statusText}`);
      }
      const postInfo = await response.json();
      setPostInfo(postInfo);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }

  useEffect(() => {
    getPost();
  }, [id]); // add id to the dependency array

  if (!postInfo) return <div>Loading...</div>;

  return (
    <div>
      <div className="postPage">
      <h1>{postInfo.title}</h1>
      <Link to="/update" className='update'>
      <HiPencilSquare  />
      update post
      </Link>
        <div className="image">
          <img src={`http://localhost:400/${postInfo.cover}`} alt='' />
        </div>
       
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      </div>
    </div>
  );
}