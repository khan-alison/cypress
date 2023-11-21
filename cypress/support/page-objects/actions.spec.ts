export class Actions {
  clickCreateGardenButton() {
    cy.get('[data-testid="RefreshIcon"]').parent().parent().parent().within(() => {
      cy.get('button[type="button"]').contains("Tạo Nhà Vườn").click();
    });
  }

  clickCreateFruitButton() {
    cy.get('[data-testid="RefreshIcon"]').parent().parent().parent().within(() => {
      cy.get('button[type="button"]').contains("Tạo quả").click();
    });
  }
  
}

export const action = new Actions()
