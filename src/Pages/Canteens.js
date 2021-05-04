import React, { useEffect } from "react";
import Canteen from "../Components/canteen";
import { Container } from "@material-ui/core";
import { getAllCanteens } from "../APIs/FoodItemsCalls";
import { useUserFoodState } from "../Context/UserFoodContext";

function Canteens() {

  const { canteens, SetAllCanteens,canteensupdated,setCanteensUpdated } = useUserFoodState();

  useEffect(() => {
    if (!canteensupdated) {
      getAllCanteens().then(({ data }) => {
        setCanteensUpdated();
        SetAllCanteens(data);
      });
    }
  },[]);

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
