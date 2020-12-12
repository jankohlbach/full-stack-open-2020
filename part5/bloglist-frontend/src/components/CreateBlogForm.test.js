import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';

import CreateBlogForm from './CreateBlogForm';

describe('<CreateBlogForm />', () => {
  test('createNewBlog handler is called with correct details', () => {
    const createNewBlog = jest.fn();

    const component = render(
      <CreateBlogForm createNewBlog={createNewBlog} />
    );

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('input[name="title"]');
    const author = component.container.querySelector('input[name="author"]');
    const url = component.container.querySelector('input[name="url"]');

    fireEvent.change(title, {
      target: {value: 'This is the title',},
    });

    fireEvent.change(author, {
      target: {value: 'famous author',},
    });

    fireEvent.change(url, {
      target: {value: 'test.com',},
    });

    fireEvent.submit(form);

    expect(createNewBlog.mock.calls[0][0].title).toBe('This is the title');
    expect(createNewBlog.mock.calls[0][0].author).toBe('famous author');
    expect(createNewBlog.mock.calls[0][0].url).toBe('test.com');
  });
});
