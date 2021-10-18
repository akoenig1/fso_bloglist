describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Barack Obama',
      username: 'bobama44',
      password: 'barry0'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page contains login form', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('bobama44')
      cy.get('#password').type('barry0')
      cy.get('#login-button').click()
      cy.contains('Logged in as Barack Obama')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('bobama44')
      cy.get('#password').type('foreignpolicy')
      cy.get('#login-button').click()
      cy.contains('Invalid credentials')
    })
  })
})