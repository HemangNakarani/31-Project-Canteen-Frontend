describe("Login", function () {
  it("Username empty error", function () {
    cy.visit("/");
    cy.get("button")
      .contains("Log In")
      .click()
      .then(() => {
        cy.get("#cy_snackbar").contains("Username can't be empty");
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Password is Empty", function () {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    //   cy.get("#cy_password").type("123456");
    cy.get("button")
      .contains("Log In")
      .click()
      .then(() => {
        cy.get("#cy_snackbar").contains(
          "Password must be atleast 6 characters long"
        );
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Password less than 6 chars", function () {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    cy.get("#cy_password").type("12345");
    cy.get("button")
      .contains("Log In")
      .click()
      .then(() => {
        cy.get("#cy_snackbar").contains(
          "Password must be atleast 6 characters long"
        );
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Not Registered UserName", function () {
    cy.visit("/");
    cy.get("#cy_username").type("xbdhvahxdsg");
    cy.get("#cy_password").type("654321");
    cy.get("button")
      .contains("Log In")
      .click()
      .then(() => {
        cy.get("#cy_snackbar");
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Wrong Password", function () {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    cy.get("#cy_password").type("654321");
    cy.get("button")
      .contains("Log In")
      .click()
      .then(() => {
        cy.get("#cy_snackbar");
      });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Correct Username/Password", function () {
    cy.visit("/");
    cy.get("#cy_username").type("HemangOp");
    cy.get("#cy_password").type("123456");
    cy.get("button").contains("Log In").click();

    cy.wait(3000);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/index");
    });
  });
});
