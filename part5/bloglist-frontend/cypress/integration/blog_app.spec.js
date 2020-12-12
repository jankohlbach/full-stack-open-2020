describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Jan',
      username: 'jan',
      password: 'admin',
    };

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('jan');
      cy.get('input[name="Password"]').type('admin');
      cy.get('button[type="submit"]').click();

      cy.contains('Jan logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('jahn');
      cy.get('input[name="Password"]').type('root');
      cy.get('button[type="submit"]').click();

      cy.contains('Request failed with status code 401');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input[name="Username"]').type('jan');
      cy.get('input[name="Password"]').type('admin');
      cy.get('button[type="submit"]').click();
    });

    it('A blog can be created', function() {
      cy.contains('new note').click();
      cy.get('input[name="title"]').type('This is the title');
      cy.get('input[name="author"]').type('famous author');
      cy.get('input[name="url"]').type('test.com');
      cy.get('form button[type="submit"]').click();

      cy.contains('a new blog This is the title by famous author added').click();
    });

    it('A user can like a blog', function() {
      cy.contains('new note').click();
      cy.get('input[name="title"]').type('This is the title');
      cy.get('input[name="author"]').type('famous author');
      cy.get('input[name="url"]').type('test.com');
      cy.get('form button[type="submit"]').click();
      cy.visit('http://localhost:3000');

      cy.contains('view').click();
      cy.contains('like').click();
      cy.visit('http://localhost:3000');
      cy.contains('view').click();
      cy.get('.likes').contains('1');
    });

    it('A blog can be deleted', function() {
      cy.contains('new note').click();
      cy.get('input[name="title"]').type('This is the title');
      cy.get('input[name="author"]').type('famous author');
      cy.get('input[name="url"]').type('test.com');
      cy.get('form button[type="submit"]').click();
      cy.visit('http://localhost:3000');

      cy.contains('view').click();
      cy.contains('remove').click();
      cy.visit('http://localhost:3000');
      cy.get('#root').should('not.contain', 'This is the title famous author');
    });
  });

  describe.only('Blogs are ordered', function() {
    beforeEach(function() {
      const user = {
        username: 'jan',
        password: 'admin',
      };

      const blog1 = {
        title: 'test 1',
        author: 'jan',
        url: 'admin',
        likes: 5,
      };

      const blog2 = {
        title: 'test 2',
        author: 'jan',
        url: 'admin',
        likes: 1,
      };

      const blog3 = {
        title: 'test 3',
        author: 'jan',
        url: 'admin',
        likes: 42,
      };

      cy.request('POST', 'http://localhost:3003/api/login/', user)
        .then(({body}) => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(body));
          cy.visit('http://localhost:3000');
        })
        .then(() => {
          cy.request({
            url: 'http://localhost:3003/api/blogs',
            method: 'POST',
            body: blog1,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
            }
          });

          cy.request({
            url: 'http://localhost:3003/api/blogs',
            method: 'POST',
            body: blog2,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
            }
          });

          cy.request({
            url: 'http://localhost:3003/api/blogs',
            method: 'POST',
            body: blog3,
            headers: {
              'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
            }
          });
        })
        .then(() => cy.visit('http://localhost:3000'));
    });

    it('Blogs are ordered according to likes', function() {
      cy.get('input[name="Username"]').type('jan');
      cy.get('input[name="Password"]').type('admin');
      cy.get('button[type="submit"]').click();

      cy.get('button.toggle-visibility')
        .then(buttons => {
          for(let i = 0; i < buttons.length; i += 1) {
            cy.wrap(buttons[i].click());
          }
        });

      cy.get('.likes')
        .then(likes => {
          let oldValue = likes[0].textContent;

          for(let i = 1; i < likes.length; i += 1) {
            if(Number(oldValue) < Number(likes[i].textContent))
              throw new Error();

            oldValue = likes[i].textContent;
          }
        });
    });
  });
});
