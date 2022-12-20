describe('create speedrun-creation modal', () => {
  it('created new speedrun modal', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[id^=createRunBtn]').click()
    cy.get('input#name').type("Cypress test user")
    cy.get('input#time').type("50000")
    cy.get('input#link').type("https://thisisatestsite.dontclick")
    cy.get('button').contains('Create').click()
    cy.get('p').contains("Error")
  })
})