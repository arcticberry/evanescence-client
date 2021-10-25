/// <reference types="cypress" />

describe('login', () => {
  it('should login an existing user', () => {
    cy.createUserIfNotExists().then((user) => {
      cy.visit('/')
      cy.findByText(/Login/i).click()
      cy.findByLabelText(/Email/i).type(user.email)
      cy.findByLabelText(/Password/i).type(user.password)
      cy.findByText(/Login/i).click()
      cy.assertLoggedInAs(user)
    })
  })
})
