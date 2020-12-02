import React, {useState, useEffect} from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if(loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password});

      blogService.setToken(user.token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const createNewBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({title, author, url});

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch(e) {
      setErrorMessage(e.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      {user === null
        ? (
          <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
              <div>
                username
                <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({target: {value}}) => setUsername(value)}
                />
              </div>
              <div>
                password
                <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({target: {value}}) => setPassword(value)}
                />
              </div>
              <button type="submit">login</button>
            </form>
          </>
        )
        : (
          <>
            <h2>blogs</h2>

            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}

            <h2>create new</h2>

            <form onSubmit={createNewBlog}>
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
        )
      }
    </div>
  );
};

export default App;
