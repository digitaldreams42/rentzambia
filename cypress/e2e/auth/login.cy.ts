// cypress/e2e/auth/login.cy.ts
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.getByTestId('login-form').should('be.visible');
    cy.getByTestId('email-input').should('be.visible');
    cy.getByTestId('password-input').should('be.visible');
    cy.getByTestId('login-button').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.getByTestId('email-input').type('test@example.com');
    cy.getByTestId('password-input').type('password123');
    cy.getByTestId('login-button').click();
    
    cy.url().should('not.include', '/login');
    cy.getByTestId('user-menu-button').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.getByTestId('email-input').type('invalid@example.com');
    cy.getByTestId('password-input').type('wrongpassword');
    cy.getByTestId('login-button').click();
    
    cy.getByTestId('error-message').should('be.visible');
    cy.url().should('include', '/login');
  });
});