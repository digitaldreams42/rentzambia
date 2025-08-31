describe('Login Flow', () => {
  beforeEach(() => {
    // Reset database before each test
    cy.resetDatabase();

    // Visit the login page
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.getByTestId('login-form').should('be.visible');
    cy.getByTestId('email-input').should('be.visible');
    cy.getByTestId('password-input').should('be.visible');
    cy.getByTestId('login-button').should('be.visible');
  });

  it('should login with valid credentials', () => {
    // Seed database with a test user
    cy.seedDatabase({
      users: [
        {
          email: 'test@example.com',
          password: 'Password123',
          role: 'tenant',
        },
      ],
    });

    // Fill in the form
    cy.getByTestId('email-input').type('test@example.com');
    cy.getByTestId('password-input').type('Password123');

    // Submit the form
    cy.getByTestId('login-button').click();

    // Should redirect to tenant dashboard
    cy.url().should('include', '/tenant');
    cy.getByTestId('dashboard-header').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    // Fill in the form with invalid credentials
    cy.getByTestId('email-input').type('invalid@example.com');
    cy.getByTestId('password-input').type('wrongpassword');

    // Submit the form
    cy.getByTestId('login-button').click();

    // Should show error message
    cy.getByTestId('error-message').should('be.visible');
    cy.url().should('include', '/login');
  });
});
