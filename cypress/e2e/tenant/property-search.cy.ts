// cypress/e2e/tenant/property-search.cy.ts
describe('Tenant Property Search', () => {
  beforeEach(() => {
    // Login as tenant
    cy.login('tenant@example.com', 'password123');
    cy.visit('/tenant');
  });

  it('should display property listings', () => {
    cy.getByTestId('property-grid').should('be.visible');
    cy.getByTestId('property-card').should('have.length.greaterThan', 0);
  });

  it('should allow searching properties', () => {
    cy.getByTestId('search-input').type('Kabulonga');
    cy.getByTestId('search-button').click();

    cy.getByTestId('property-card').each($el => {
      cy.wrap($el).should('contain.text', 'Kabulonga');
    });
  });

  it('should allow filtering properties', () => {
    cy.getByTestId('filter-button').click();
    cy.getByTestId('bedrooms-filter').select('2');
    cy.getByTestId('apply-filters-button').click();

    cy.getByTestId('property-card').each($el => {
      cy.wrap($el).should('contain.text', '2 bed');
    });
  });

  it('should allow viewing property details', () => {
    cy.getByTestId('property-card').first().click();
    cy.url().should('include', '/property/');
    cy.getByTestId('property-details').should('be.visible');
  });
});
