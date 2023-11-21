/// <reference types='cypress'/>

import { navigationTo } from '../support/page-objects/navigation.spec'

describe('Test with gardener management', () => {
  beforeEach('Login to the application', () => {
    cy.loginToApplication('admin', 'admin@123', 100)
  })

  // it('Loop through the table', () => {
  //   navigationTo.gardenManagementPage()
  //   cy.wait(1000)
  //   cy.get('table[aria-labelledby="tableTitle"]')
  //     .find('tbody')
  //     .find('tr')
  //     .each(tableRow => {
  //       cy.wrap(tableRow).find('td').eq(1).should('contain', 'Nguyễn Văn Ab')
  //     })
  // })

  // it('Call api', () => {
  //   cy.request('GET', 'http://localhost:3000/gardeners').then(response => {
  //     expect(response.status).to.eq(200)

  //     const gardeners = response.body.data.items

  //     navigationTo.gardenManagementPage()
  //     cy.get('table[aria-labelledby="tableTitle"]')
  //       .find('tbody tr')
  //       .each(($row, index) => {
  //         const expectedFirstName = gardeners[index].first_name
  //         const expectedLastName = gardeners[index].last_name
  //         const dob = new Date(gardeners[index].date_of_birth);
  //         const expectedDateOfBirth = dob.toLocaleDateString('en-GB');
  //         const expectedPhone = gardeners[index].phone
  //         cy.wrap($row)
  //           .find('td')
  //           .eq(1)
  //           .should('have.text', expectedFirstName + ' ' + expectedLastName)
  //         cy.wrap($row).find('td').eq(2).should('have.text', expectedDateOfBirth)
  //         cy.wrap($row).find('td').eq(3).should('have.text', expectedPhone)
  //       })
  //   })
  // })

  // it('Search garden', () =>{
  //   navigationTo.gardenManagementPage()
  //   cy.wait(1000)
  //   cy.get('[data-testid="MagnifyIcon"]').eq(1).parent().siblings().eq(0)
  //   .type('Nguyen{enter}');
  // })
  
  it('should display search results that match the API response', () => {
    navigationTo.gardenManagementPage()
    cy.get('[data-testid="MagnifyIcon"]').eq(1).parent().siblings().eq(0).type('Nguyen{enter}')

    cy.request('GET', 'http://localhost:3000/gardeners?search_field=Nguyen').then(response => {
      expect(response.status).to.eq(200)

      const gardeners = response.body.data.items

      navigationTo.gardenManagementPage()
      cy.get('table[aria-labelledby="tableTitle"]')
        .find('tbody tr')
        .each(($row, index) => {
          const expectedFirstName = gardeners[index].first_name
          const expectedLastName = gardeners[index].last_name
          const dob = new Date(gardeners[index].date_of_birth);
          const expectedDateOfBirth = dob.toLocaleDateString('en-GB');
          const expectedPhone = gardeners[index].phone
          cy.wrap($row)
            .find('td')
            .eq(1)
            .should('have.text', expectedFirstName + ' ' + expectedLastName)
          cy.wrap($row).find('td').eq(2).should('have.text', expectedDateOfBirth)
          cy.wrap($row).find('td').eq(3).should('have.text', expectedPhone)
        })
    })
  })
})
