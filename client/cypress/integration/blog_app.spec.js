describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Front page contains login form', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
    cy.get('#username')
    cy.get('#password')
  })
})