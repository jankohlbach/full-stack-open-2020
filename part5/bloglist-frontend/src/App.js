import React, {useState, useEffect, useRef} from 'react';
import Togglable from './components/Togglable';
import CreateBlogForm from './components/CreateBlogForm';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);

  const createBlogFormRef = useRef();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if(loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
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
      setNotification(e.message);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, []);

  const createNewBlog = async ({title, author, url}) => {
    try {
      createBlogFormRef.current.toggleVisibility();

      const newBlog = await blogService.create({title, author, url});

      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => setNotification(null), 5000);
    } catch(e) {
      setNotification(e.message);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div>
      {notification && <b>{notification}</b>}

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

            <p style={{display: 'inline-block'}}>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>

            <Togglable buttonLabel="new note" ref={createBlogFormRef}>
              <CreateBlogForm createNewBlog={createNewBlog} />
            </Togglable>

            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        )
      }
    </div>
  );
};

export default App;
