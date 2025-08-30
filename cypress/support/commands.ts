// cypress/support/commands.ts
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.getByTestId('email-input').type(email);
  cy.getByTestId('password-input').type(password);
  cy.getByTestId('login-button').click();
  cy.url().should('not.include', '/login');
});

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.getByTestId('user-menu-button').click();
  cy.getByTestId('logout-button').click();
  cy.url().should('include', '/login');
});

// Custom command to get elements by data-testid
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to clear localStorage and sessionStorage
Cypress.Commands.add('clearStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});

// Custom command to reset database
Cypress.Commands.add('resetDatabase', () => {
  // This would typically call an API endpoint to reset the test database
  cy.request('POST', '/api/test/reset-database');
});

// Custom command to seed database
Cypress.Commands.add('seedDatabase', (seedData) => {
  // This would typically call an API endpoint to seed the test database
  cy.request('POST', '/api/test/seed-database', seedData);
});

// Custom command to wait for API calls
Cypress.Commands.add('waitForApi', (alias) => {
  cy.wait(`@${alias}`, { timeout: 10000 });
});

// Custom command to intercept API calls
Cypress.Commands.add('interceptApi', (method, url, response) => {
  cy.intercept(method, url, response).as(url.replace(/\//g, '_'));
});

export {};