/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const baseUrl = "http://localhost:3000";
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    // Clear session storage
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  // test cases u have to change is these all 'it' below
  it("Checking questions", () => {
    cy.visit(baseUrl + "/main.html"); //always check this "visit" in your test case that it is set to -  baseUrl + "/main.html"
    cy.get("div#questions").children("div").should("have.length", 5);

    // Check questions
    cy.get("div#questions > div").each(($ele, index) => {
      expect($ele.text().split("?")[0] + "?").equal(questions[index].question);

      cy.wrap($ele).within(() => {
        cy.get("input").each((input, i) => {
          expect(input.attr("value")).to.be.equal(questions[index].choices[i]);
        });
      });
    });

    // Check submit button
    cy.get("button#submit");

    // Check output should be empty
    cy.get("div#score").should("be.empty");
  });

  // Check if questions stored in session
  it("Checking if stored in session", () => {
    cy.visit(baseUrl + "/main.html"); //always check this "visit" in your test case that it is set to -  baseUrl + "/main.html"
    cy.get("div#questions").children("div").should("have.length", 5);

    // No checked elements should be there
    cy.get('[type="radio"][checked="true"]').should("not.exist");

    cy.get("div#questions > div").each(($ele, index) => {
      cy.wrap($ele).within(() => {
        cy.get("input").first().click();
      });
    });

    // Check if persisted after reload
    cy.reload();

    // 4 elements should be there
    cy.get('[type="radio"][checked="true"]').should("have.length", 5);

    cy.get("button#submit").click();

    cy.get("div#score").then((span) =>
      expect(span.text()).equal("Your score is 3 out of 5.")
    );

    // Check if stored in localstorage
    cy.window().its("localStorage.score").should("eq", "3");
  });
});
