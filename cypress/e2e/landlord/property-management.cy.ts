// cypress/e2e/landlord/property-management.cy.ts
describe('Landlord Property Management', () => {
  beforeEach(() => {
    // Login as landlord
    cy.login('landlord@example.com', 'password123');
    cy.visit('/landlord/properties');
  });

  it('should display property listings', () => {
    cy.getByTestId('property-grid').should('be.visible');
    cy.getByTestId('property-card').should('have.length.greaterThan', 0);
  });

  it('should allow adding new property', () => {
    cy.getByTestId('add-property-button').click();
    cy.getByTestId('property-form').should('be.visible');
    
    cy.getByTestId('title-input').type('Test Property');
    cy.getByTestId('location-input').type('Test Location');
    cy.getByTestId('price-input').type('3500');
    cy.getByTestId('bedrooms-input').type('2');
    cy.getByTestId('bathrooms-input').type('1');
    cy.getByTestId('area-input').type('85');
    cy.getByTestId('description-input').type('Test property description');
    
    cy.getByTestId('submit-property-button').click();
    
    cy.getByTestId('success-message').should('be.visible');
    cy.getByTestId('property-card').should('contain.text', 'Test Property');
  });

  it('should allow editing property', () => {
    cy.getByTestId('edit-property-button').first().click();
    cy.getByTestId('property-form').should('be.visible');
    
    cy.getByTestId('title-input').clear().type('Updated Property Title');
    cy.getByTestId('submit-property-button').click();
    
    cy.getByTestId('success-message').should('be.visible');
    cy.getByTestId('property-card').should('contain.text', 'Updated Property Title');
  });

  it('should allow deleting property', () => {
    cy.getByTestId('delete-property-button').first().click();
    cy.getByTestId('confirm-delete-button').click();
    
    cy.getByTestId('success-message').should('be.visible');
  });
});