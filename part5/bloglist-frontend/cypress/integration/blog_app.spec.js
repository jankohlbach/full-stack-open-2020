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
});
