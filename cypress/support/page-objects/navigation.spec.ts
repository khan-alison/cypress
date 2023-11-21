export class Navigation {
  dashBoardPage() {
    cy.get('a[href="/"]').eq(1).click()
  }

  accountSettingPage() {
    cy.get('a[href="/account-settings/"]').click()
  }

  gardenManagementPage() {
    cy.get('a[href="/garden/"]').click()
  }

  fruitManagementPage() {
    cy.get('a[href="/fruit/"]').click()
  }
}

export const navigationTo = new Navigation()