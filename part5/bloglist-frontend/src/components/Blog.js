import React, {useState} from 'react';
import blogService from '../services/blogs';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const addLike = async () => {
    try {
      const updatedBlog = await blogService.addLike(blog);
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div style={blogStyle}>
      <div style={{display: 'inline-block'}}>{blog.title} {blog.author}</div>
      <button onClick={() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? 'hide' : 'view'}</button>

      {detailsVisible && (
        <>
          <div>{blog.url}</div>
          <div style={{display: 'inline-block'}}>{blog.likes}</div>
          <button onClick={addLike}>like</button>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
