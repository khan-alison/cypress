/// <reference types='cypress'/>

describe('Test with login screen', () => {
  it('Login with wrong credential', () => {
    cy.loginToApplication('admin1', 'admin@123', 100)
    cy.loginToApplication('admin', 'admin112s', 100)
  })

  it('Should show an error when username is not filled', () => {
    cy.loginToApplication('', 'yourPassword')
  })

  it('Should show an error when password is not filled', () => {
    cy.loginToApplication('yourUsername', '')
  })

  it('Should show an error when both username and password are not filled', () => {
    cy.loginToApplication('', '')
  })

  it('Login successfully', () => {
    cy.loginToApplication('admin', 'admin@123', 100)
  })
})
