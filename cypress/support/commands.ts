/// <reference types="cypress" />

Cypress.Commands.add('loginToApplication', (username, password, delay = 0) => {
  cy.visit('/auth/login/')

  if (username) {
    cy.get('[name="user_name"]').type(username, { delay: delay })
  }
  cy.get('[type="button"]').click()

  if (password) {
    cy.get('[name="password"]').type(password, { delay: delay })
  }

  cy.get('[type="submit"]').click()

  if (!username) {
    // cy.get('label').contains('Tên đăng nhập').parent().siblings().eq(0).should('contain', 'User Name is required')
    cy.get('label')
      .contains('Tên đăng nhập')
      .parent()
      .siblings()
      .eq(0)
      .then(el => {
        expect(el.text()).to.contain('User Name is required')
      })
  }

  if (!password) {
    // cy.get('label').contains('Mật khẩu').parent().siblings().eq(0).should('contain', 'Password is required')
    cy.get('label')
      .contains('Mật khẩu')
      .parent()
      .siblings()
      .eq(0)
      .then($el => {
        expect($el.text()).to.contain('Password is required')
      })
  }

  if (username && password) {
    cy.get('#notistack-snackbar', { timeout: 10000 }).then(toast => {
      const toastText = toast.text()
      if (toastText.includes('Login Successfully!')) {
        cy.url().should('include', '/')
      } else if (toastText.includes('User Name or Pass Word Invalid!')) {
        toastText.includes('User Name or Pass Word Invalid!')
        cy.log('Login failed: User Name or Pass Word Invalid!')
      }
    })
  }
})

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    loginToApplication(username: string, password: string, delay?: number): Chainable<void>
  }
}
