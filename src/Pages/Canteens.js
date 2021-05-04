import React, { useEffect } from "react";
import Canteen from "../Components/canteen";
import { Container } from "@material-ui/core";
import { getAllCanteens } from "../APIs/FoodItemsCalls";
import { useUserFoodState } from "../Context/UserFoodContext";

function Canteens() {
  useEffect(() => {
    if (canteens.length === 0) {
      getAllCanteens().then(({ data }) => {
        SetAllCanteens(data);
      });
    }
  });

  const { canteens, SetAllCanteens } = useUserFoodState();

  return (
    <div className="container">
      {canteens.map((canteen) => {
        return (
          <Container key={canteen.canteenName}>
            <Canteen {...canteen} />
          </Container>
        );
      })}
    </div>
  );
}

export default Canteens;
