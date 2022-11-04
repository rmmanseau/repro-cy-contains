import React from 'react';
import App from './App';

describe('test', () => {
  it('cy.contains', () => {
    cy.mount(<App/>);
    cy.contains("First").click();
    cy.contains("Confirm First").closestContains("OK").click();
    cy.contains("Second").click();
    cy.contains("Confirm Second").closestContains("OK").click();
    cy.contains("Right")
  })
})
