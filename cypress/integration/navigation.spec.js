describe("Navigation", function () {
  it("Can not navigate to dashboard without login", function () {
    cy.visit("/index");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });

    cy.visit("/canteens");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });

    cy.visit("/cart");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });

    cy.visit("/profile");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });

    cy.visit("/settings");
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });

  it("Can navigate to SignUp from Login", function () {
    cy.visit("/");
    cy.get("button").contains("Sign up").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/signup");
    });
  });

  it("Can navigate to Login from Signup", function () {
    cy.visit("/auth/signup");
    cy.get("button").contains("Login").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/auth/login");
    });
  });
});
