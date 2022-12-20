describe('navigate to discord login', () => {
  it('navigated to discord', () => {
    cy.visit('http://localhost:3000/')
    cy.get('button').contains("Login").click()
    cy.get('button').contains("Discord").click()
  })
})