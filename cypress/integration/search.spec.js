import "cypress-localstorage-commands";

describe("Search Tests", function () {
  Cypress.Commands.add("LogIn", () => {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    cy.get("#cy_password").type("123456");
    cy.get("button").contains("Log In").click();
    cy.wait(1000);
  });

  before(() => {
    cy.LogIn();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

  it("Search is working or not | case insensitive | 1 letter", function () {
    cy.visit("/index");

    cy.wait(1000);

    const searchText = "L";

    cy.get("#cy_search_text").type(searchText);
    cy.get('[identifier="cy_fooditem"]').each((obj)=>{

      const idText = normalizeText(obj.text())
      expect(idText).to.contain(searchText.toLowerCase());

    });
  });

  it("Search is working or not | case insensitive | 2 letter", function () {
    cy.visit("/index");

    cy.wait(1000);

    const searchText = "La";

    cy.get("#cy_search_text").type(searchText);
    cy.get('[identifier="cy_fooditem"]').each((obj)=>{

      const idText = normalizeText(obj.text())
      expect(idText).to.contain(searchText.toLowerCase());

    });
  });

  it("Search is working or not | case insensitive | 3 letter", function () {
    cy.visit("/index");

    cy.wait(1000);

    const searchText = "Las";

    cy.get("#cy_search_text").type(searchText);
    cy.get('[identifier="cy_fooditem"]').each((obj)=>{

      const idText = normalizeText(obj.text())
      expect(idText).to.contain(searchText.toLowerCase());

    });
  });

  it("Clear Search Button Working Or Not", function () {

    cy.visit("/index");

    cy.wait(1000);


    cy.get("#cy_search_text").type("Mozilla");
    cy.get('[identifier="cy_fooditem"]').should("have.length", 0);

    cy.get("#cy_cancel_search")
      .click()
      .then(() => {
        cy.get('[identifier="cy_fooditem"]').should("have.length", 5);
      });
  });

  it("Hitting Enter After Search", function () {

    cy.visit("/index");

    const searchText = "Mozilla";

    cy.wait(500);

    cy.get("#cy_search_text").type(searchText).type('{enter}');

    cy.wait(500);
    
    cy.get('[identifier="cy_fooditem"]').each((obj)=>{

      const idText = normalizeText(obj.text())
      expect(idText).to.contain(searchText);

    });

  });

});
