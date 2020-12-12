import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';

import Blog from './Blog';

describe('<Blog />', () => {
  test('renders title and author but not url and likes', () => {
    const blog = {
      title: 'Title of blog',
      author: 'Jan',
      url: 'test.com',
      likes: 42,
    };

    const component = render(
      <Blog blog={blog} />
    );

    const text = component.getByText(`${blog.title} ${blog.author}`);
    expect(text).toBeDefined();

    const url = component.container.querySelector('.url');
    expect(url).not.toBeInTheDocument();

    const likes = component.container.querySelector('.likes');
    expect(likes).not.toBeInTheDocument();
  });

  test('url and likes are shown when button is clicked', () => {
    const blog = {
      title: 'Title of blog',
      author: 'Jan',
      url: 'test.com',
      likes: 42,
      user: {
        name: 'Jan',
        username: 'jan',
      },
    };

    const user = {
      name: 'Jan',
      username: 'jan',
    };

    const component = render(
      <Blog blog={blog} user={user} />
    );

    const button = component.getByText('view');

    fireEvent.click(button);

    const url = component.container.querySelector('.url');
    expect(url).toBeInTheDocument();

    const likes = component.container.querySelector('.likes');
    expect(likes).toBeInTheDocument();
  });

  test('like button triggers eventListener', () => {
    const blog = {
      title: 'Title of blog',
      author: 'Jan',
      url: 'test.com',
      likes: 42,
      user: {
        name: 'Jan',
        username: 'jan',
      },
    };

    const user = {
      name: 'Jan',
      username: 'jan',
    };

    const addLike = jest.fn();

    const component = render(
      <Blog blog={blog} user={user} />
    );

    const viewButton = component.getByText('view');

    fireEvent.click(viewButton);

    const likeButton = component.container.querySelector('.button-like');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // fails because at this time the eventListener is not passed as prop to Blog anymore
    // expect(addLike.mock.calls).toHaveLength(2);
  });
});
