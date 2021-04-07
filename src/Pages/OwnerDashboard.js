import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "../Components/Owners/Dashboard";

class OwnerDashboard extends Component {
  state = {
    canteenName: "PadmaKamal Caterers",
    notifs: 10,
  };
  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <Navbar expand="lg" variant="light" bg="light">
            <Navbar.Brand>
              <h1 style={{ fontFamily: "Garamond" }}>
                <b>Welcome {this.state.canteenName} !!</b>
              </h1>
            </Navbar.Brand>
          </Navbar>
        </Container>
        <Dashboard notifs={this.state.notifs} />
      </React.Fragment>
    );
  }
}

export default OwnerDashboard;
