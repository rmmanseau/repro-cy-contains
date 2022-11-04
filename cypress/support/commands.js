// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('closestContains', { prevSubject: 'element' }, (subject, arg0, arg1, arg2) => {
  /*
   * Climb up parents until finding an element that matches .contains(selector, text)
   *
   * @param {string} selector
   * @param {string} content
   * @param {int} depth
   *
   * Syntax:
   *   .contains(content)
   *   .contains(selector, content)
   *   .contains(content, depth)
   *   .contains(selector, content, depth)
   */
  let selector, text, depth = 5;

  // closestContains(text)
  if (typeof arg0 === "string" && arg1 === undefined && arg2 === undefined) {
    text = arg0
  // closestContains(selector, text)
  } else if (typeof arg0 === "string" && typeof arg1 === "string" && arg2 === undefined) {
    selector = arg0
    text = arg1
  // closestContains(text, depth)
  } else if (typeof arg0 === "string" && Number.isInteger(arg1) && arg2 === undefined) {
    text = arg0
    depth = arg1
  // closestContains(selector, text, depth)
  } else if (typeof arg0 === "string" && typeof arg1 === "string" && Number.isInteger(arg2)) {
    selector = arg0
    text = arg1
    depth = arg2
  // something wrong
  } else {
    throw Error("incorrect arguments")
  }

  // iterate back <depth> parents from <subject>
  let yielded;
  cy.wrap(subject).parents().filter(`:lt(${depth})`).each(parent => {
    cy.then(() => {
      // skip iteration if .contains found an element to yield
      if (yielded !== undefined) {
        return yielded
      }
      // apply .contains to the current parent
      cy.wrap(parent)
        .contains(selector, text, {log: false})
        .should(el => el) // supress error if contains fails
        .then(el => {
          // if a single element is found, then yield the element
          if (el.length === 1) {
            yielded = el;
          }
        })
    })
  }).then(($el) => yielded || cy.wrap($el, {log: false}).last({log: false}))
    .contains(selector, text) // force error if no parents contain element
})
