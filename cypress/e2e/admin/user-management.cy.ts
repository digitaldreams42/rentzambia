// cypress/e2e/admin/user-management.cy.ts
describe('Admin User Management', () => {
  beforeEach(() => {
    // Login as admin
    cy.login('admin@example.com', 'password123');
    cy.visit('/admin/users');
  });

  it('should display user listings', () => {
    cy.getByTestId('user-grid').should('be.visible');
    cy.getByTestId('user-card').should('have.length.greaterThan', 0);
  });

  it('should allow searching users', () => {
    cy.getByTestId('search-input').type('John');
    cy.getByTestId('user-card').each(($el) => {
      cy.wrap($el).should('contain.text', 'John');
    });
  });

  it('should allow filtering users by role', () => {
    cy.getByTestId('role-filter').select('landlord');
    cy.getByTestId('user-card').each(($el) => {
      cy.wrap($el).should('contain.text', 'landlord');
    });
  });

  it('should allow suspending users', () => {
    cy.getByTestId('suspend-user-button').first().click();
    cy.getByTestId('confirm-suspend-button').click();
    
    cy.getByTestId('success-message').should('be.visible');
    cy.getByTestId('user-status').first().should('contain.text', 'suspended');
  });

  it('should allow approving pending users', () => {
    cy.getByTestId('approve-user-button').first().click();
    cy.getByTestId('confirm-approve-button').click();
    
    cy.getByTestId('success-message').should('be.visible');
    cy.getByTestId('user-status').first().should('contain.text', 'active');
  });
});