import "cypress-localstorage-commands";

describe("Cart Tests", function () {
  Cypress.Commands.add("LogIn", () => {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    cy.get("#cy_password").type("123456");
    cy.get("button").contains("Log In").click();
    cy.wait(1000);
  });

  before(() => {
    cy.LogIn();
    cy.get('[identifier="cy_add_to_cart_button"]').each((obj, index) => {
      if (index === 0 || index === 1) {
        cy.wrap(obj).click();
        cy.wait(300);
      }
    });
    cy.wait(500);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit("/cart");
    cy.wait(1000);
  });

  after(() => {
    cy.get("#cy_clear_cart").click();
  });

  const normalizeText = (s) => s.replace(/\s/g, "").toLowerCase();

  it("Navigation Check", function () {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/cart");
    });
  });

  it("Verifying Total", function () {
    const prises = [];

    cy.get('[identifier="cy_cart_prizetag"]').each((obj, index) => {
      const prize = parseInt(obj.text().split(" ")[1]);
      prises.push(Number(prize));
    });

    var toto = 0;

    cy.get('[identifier="cy_cart_quantity"]')
      .each((obj, index) => {
        const q = parseInt(obj.text());
        toto = toto + q * prises[index];
      })
      .then(() => {
        cy.get("#cy_cart_total").contains(toto);
      });
  });

  it("Verify Total after Increment", function () {
    cy.get('[aria-label="inc"]').each((obj, index) => {
      if (index === 1) {
        cy.wrap(obj).click();
      }
    });

    cy.wait(500);

    cy.get('[identifier="cy_cart_item"]').should("have.length", 2);

    const prises = [];

    cy.get('[identifier="cy_cart_prizetag"]').each((obj, index) => {
      const prize = parseInt(obj.text().split(" ")[1]);
      prises.push(Number(prize));
    });

    var toto = 0;

    cy.get('[identifier="cy_cart_quantity"]')
      .each((obj, index) => {
        const q = parseInt(obj.text());
        toto = toto + q * prises[index];
      })
      .then(() => {
        cy.get("#cy_cart_total").contains(toto);
      });
  });

  it("Should Delete item if user further decreases when quantity is one | Verify Total after decrement", function () {
    let flag = 0;

    cy.get('[aria-label="dec"]').each((obj, index) => {
        cy.wrap(obj).click();
    });

    cy.wait(500);

    cy.get('[identifier="cy_cart_item"]').should("have.length", 1);

    const prises = [];

    cy.get('[identifier="cy_cart_prizetag"]').each((obj, index) => {
      const prize = parseInt(obj.text().split(" ")[1]);
      prises.push(Number(prize));
    });

    var toto = 0;

    cy.get('[identifier="cy_cart_quantity"]')
      .each((obj, index) => {
        const q = parseInt(obj.text());
        toto = toto + q * prises[index];
      })
      .then(() => {
        cy.get("#cy_cart_total").contains(toto);
      });
  });
});
