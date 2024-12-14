import React from 'react'
import {formatISO9075} from"date-fns"
import { Link } from 'react-router-dom';
export default function Posts({_id,title,cover,summary,content,createdAt,auther}) {
  const createdAtValue = createdAt || new Date();
  return (
    <div>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:400/${cover}` } /></Link>
        </div>
        <div className="postDetail">
        <Link to={`/post/${_id}`}>
            <h2>
               {title}</h2></Link>
            <p className='info'>
                <a className='auther'>{auther? (
              <a className='auther'>{auther.username}</a>
            ) : (
              <span>Unknown author</span>
            )}</a>
                <time>{formatISO9075(new Date(createdAtValue))}</time>
            </p>
            <p className='summary'>
         {summary}     </p>
        </div>
      </div>
    </div>
  )
}
