import React, {useState} from 'react';
import PropTypes from 'prop-types';

import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({blog, user}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const addLike = async () => {
    try {
      await blogService.addLike(blog);
    } catch(e) {
      console.error(e);
    }
  };

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog);
      } catch(e) {
        console.error(e);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div style={{display: 'inline-block'}}>{blog.title} {blog.author}</div>
      <button onClick={() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? 'hide' : 'view'}</button>

      {detailsVisible && (
        <>
          <div className="url">{blog.url}</div>
          <div className="likes" style={{display: 'inline-block'}}>{blog.likes}</div>
          <button className="button-like" onClick={addLike}>like</button>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
