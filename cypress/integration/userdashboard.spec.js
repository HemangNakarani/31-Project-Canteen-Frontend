import "cypress-localstorage-commands";

describe("User Dashboard Tests", function () {
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

  const normalizeText = (s) => s.replace(/\s/g, "").toLowerCase();

  it("Test Fetched All Food Items", function () {
    cy.visit("/index");

    cy.wait(500);

    // cy.get("#cy_search_text").type("Mozilla");
    cy.get('[identifier="cy_fooditem"]').should("have.length", 5);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/index");
    });
  });

  it("Successfully Add Item to cart", function () {
    cy.visit("/index");

    cy.get("#cy_add_to_cart")
      .click()
      .then(() => {
        cy.wait(200);

        cy.get("#notistack-snackbar").contains("is added to your cart");
      });
  });

  it("Item already exists in cart", function () {
    cy.visit("/index");

    cy.get("#cy_add_to_cart")
      .click()
      .then(() => {
        cy.wait(200);

        cy.get("#notistack-snackbar").contains("is already in the cart");
      });
  });

  it("Ongoing Order Dialog Rendering", function () {
    cy.visit("/index");

    cy.get("#cy_ongoing_orders")
      .click()
      .then(() => {
        cy.wait(200);

        cy.get("#cy_ongoing_orders_dialog").contains("Orders");
      });
  });

  it("Can Navigate to cart from cart button | Clean Up", function () {
    cy.visit("/index");

    cy.get("#cy_cart_button_dashboard").click();

    cy.wait(200);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/cart");
    });

    cy.wait(200);

    cy.get('[identifier="cy_cart_remove_item"]')
      .click()
      .then(() => {
        cy.wait(200);
        cy.get("#notistack-snackbar").contains("is removed succesfully");
      });
  });
});
