import React, { Component } from "react";
import Canteen from "../Components/canteen";
import { Container } from "@material-ui/core";

class Canteens extends Component {
  state = {
    data: [
      {
        canteenLogo: "burger.png",
        canteenName: "Padmakamal Caterers",
        canteenAltName: "3rdCanteen",
        open: true,
        rating: 5,
        offer: "50% Off",
      },
      {
        canteenLogo: "burger.png",
        canteenName: "Padmakamal Caterers 2",
        canteenAltName: "3rdCanteen",
        open: false,
        rating: 4.5,
        offer: "20% Off",
      },
    ],
  };
  render() {
    return (
      <div className="container">
        {this.state.data.map((canteen) => {
          return (
            <Container key={canteen.canteenName}>
              <Canteen {...canteen} />
            </Container>
          );
        })}
      </div>
    );
  }
}

export default Canteens;
