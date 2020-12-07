import React, {useState} from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

const Blog = ({blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div style={blogStyle}>
      <div style={{display: 'inline-block'}}>{blog.title} {blog.author}</div>
      <button onClick={() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? 'hide' : 'view'}</button>

      {detailsVisible && (
        <>
          <div>{blog.url}</div>
          <div style={{display: 'inline-block'}}>{blog.likes}</div>
          <button>like</button>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
