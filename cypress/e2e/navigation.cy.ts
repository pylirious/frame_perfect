describe('Navigation to minecraft page', () => {
  it('should navigate to the minecraft records page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "games" and click it
    cy.get('a[href*="games"]').click()

    // The new url should include "/games"
    cy.url().should('include', '/games')

    // Find a link with an href attribute containing "minecraft" and click it
    cy.get('a[href*="minecraft"]').click()


    // The new url should include "/minecraft"
    cy.url().should('include', '/minecraft')

    // The new page should contain an h1 with "Speedruns"
    cy.get('h3').contains('Minecraft')
  })
})

describe('Navigation to speedruns', () => {
  it('should navigate to the speedruns page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "speedruns" and click it
    cy.get('a[href*="speedruns"]').click()

    // The new url should include "/speedruns"
    cy.url().should('include', '/speedruns')

    // The new page should contain an h1 with "Speedruns"
    cy.get('h1').contains('Speedruns')
  })
})

