describe('login', () => {
  it('should register a user if the user does not exist', () => {
    cy.getDefaultUser().then((user) => {
      cy.visit('/')
      cy.findByText(/Sign up/i).click()
      cy.findByLabelText(/Business Name/i).type(user.businessName)
      cy.findByLabelText(/Email/i).type(user.email)
      cy.findByLabelText(/Phone Number/i).type(user.phone)
      cy.findByLabelText(/Password/i).type(user.password)
      cy.get('button')
        .contains(/Sign up/i)
        .click()
      // Should visit the login page when registration is done
      cy.location('pathname').should('match', /\/login$/)
    })
  })
})
