import React, { useEffect, useState } from 'react'
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import ReactQuill from 'react-quill';
export default function Update() {
    const {id}= useParams()
    const[title,setTitle]= useState('')
    const[summary,setSummary]= useState('')
    const[content,setContent]= useState('')
    const [redirect, setRedirect] = useState(false);
    const [files, setFile] = useState(null);
    useEffect(() => {fetchPost()},[id])
    async function fetchPost() {
      fetch(`http://localhost:400/post/${id}`)
      .then(res=>{res.json()
        .then(postInfo=>{
            setTitle(postInfo.title)
            setContent(postInfo.content)
            setSummary(postInfo.summary)
        })
      })

    }
    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
       //y data.set('auther', info._id); // Add auther field to the request body
        try {
          const response = await fetch("http://localhost:400/post", {
            method: 'PUT',
            body: data,
            credentials: 'include'
          });
          if (response.ok) {
            console.log(await response.json());
            setRedirect(true);
          } else {
            console.error("Error updating post:", response.statusText);
          }
        } catch (error) {
          console.error("Error updating post:", error);
        }
      }
  const modules ={
    toolbar:[
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
['blockquote', 'code-block'],
['link', 'image', 'video', 'formula'],

[{ 'header': 1 }, { 'header': 2 }],               // custom button values
[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
[{ 'direction': 'rtl' }],                         // text direction

[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
[{ 'font': [] }],
[{ 'align': [] }],

['clean']
    ]
}
if (redirect) {
    return <Navigate to={"/post/"+id }/>;
  }
return (

   <form onSubmit={updatePost}>
  <input type="text"
   placeholder="Title"
    value={title} 
    onChange={(ev) => setTitle(ev.target.value)} />
  
  <input type="text" 
  placeholder="Summary" 
  value={summary} 
  onChange={(ev) => setSummary(ev.target.value)} />
  <input 
  type="file"
 
  onChange={(ev) => setFile(ev.target.files)} />
 
  <ReactQuill 
  value={content} 
  modules={modules} 
  onChange={(content) => setContent(content)} />
  <button style={{ marginTop: "5px" }}>Update Post</button>
</form>

)
}

