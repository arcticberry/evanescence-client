import e from '../../src/constants/endpoints'
import {userBuilder} from './generate'

const API_BASE_URL = Cypress.env('API_BASE_URL')
const userCredentials = {
  email: Cypress.env('USER_EMAIL'),
  password: Cypress.env('USER_PASSWORD'),
}

const user = userBuilder({
  email: userCredentials.email,
  password: userCredentials.password,
})

Cypress.Commands.add('createUser', (overrides) => {
  return Promise.resolve(user)
  //   return cy
  //     .request({
  //       url: [API_BASE_URL, e.CREATE_USER].join(''),
  //       method: 'POST',
  //       body: user,
  //     })
  //     .then(({body}) => body.user)
})

Cypress.Commands.add('login', (user) => {
  return cy
    .request({
      url: [API_BASE_URL, e.LOGIN].join(''),
      method: 'POST',
      body: user,
    })
    .then(({body}) => {
      window.localStorage.setItem('token', body.user.token)
      return body.user
    })
})

Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then((user) => {
    cy.login(user)
  })
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', (user) => {
  cy.window().its('localStorage.authToken').should('be.a', 'string')
})
