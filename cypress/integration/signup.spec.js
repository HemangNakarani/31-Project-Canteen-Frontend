describe("Login", function () {
    it("Username empty error", function () {
      cy.visit("/auth/signup");

      cy.get("button")
        .contains("Sign Up")
        .click()
        .then(() => {
            cy.get('#cy_snackbar').should('have.text', "Username can't be empty")
        });
  
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/auth/signup");
      });
    });

    it("Email empty error", function () {
        cy.visit("/auth/signup");

        cy.get("#cy_username").type("HemangOp");
  
        cy.get("button")
          .contains("Sign Up")
          .click()
          .then(() => {
              cy.get('#cy_snackbar').should('have.text', "Enter Valid E-mail")
          });
    
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq("/auth/signup");
        });
      });

      it("Not Valid Email Error", function () {
        cy.visit("/auth/signup");
        

        cy.get("#cy_username").type("HemangOp");
        cy.get("#cy_email").type("xyz.pqr");
  
        cy.get("button")
          .contains("Sign Up")
          .click()
          .then(() => {
              cy.get('#cy_snackbar').should('have.text', "Enter Valid E-mail")
          });
    
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq("/auth/signup");
        });
      });

      it("Not using daiict mail id", function () {

        cy.visit("/auth/signup");

        cy.get("#cy_username").type("HemangOp");
        cy.get("#cy_email").type("xyz@gmail.com");
  
        cy.get("button")
          .contains("Sign Up")
          .click()
          .then(() => {
              cy.get('#cy_snackbar').should('have.text', "Sign Up using only DAIICT E-mail Id")
          });
    
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq("/auth/signup");
        });
      });


      it("Empty Password | Password < 6 chars Error", function () {

        cy.visit("/auth/signup");
        
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq("/auth/signup");
        });

        cy.get("#cy_username").type("HemangOp");
        cy.get("#cy_email").type("xyz@daiict.ac.in");
  
        cy.get("button")
          .contains("Sign Up")
          .click()
          .then(() => {
              cy.get('#cy_snackbar').should('have.text', "Password must be atleast 6 characters long")
          });
    
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq("/auth/signup");
        });
      });

  });
  