import React, {useState} from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = ({createNewBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    createNewBlog({title, author, url});

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({target: {value}}) => setTitle(value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({target: {value}}) => setAuthor(value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({target: {value}}) => setUrl(value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

CreateBlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
