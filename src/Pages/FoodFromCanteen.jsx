import React, {useEffect } from "react";
import FoodItem from "../Components/FoodItem";
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  Box,
  CssBaseline,
  Grow,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { getAllFoodItems } from "../APIs/FoodItemsCalls";
import { useUserFoodState } from "../Context/UserFoodContext";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 8,
    "&:hover, &:focus": {
      color: theme.palette.secondary.main,
    },
  },
  gridcont: {
    marginTop: 24,
  },
  gridorders: {
    padding: 24,
  },
}));

function FoodFromCanteen(props) {
  const classes = useStyles();
  //   const history = useHistory();
  const canteenId = props.match.params.id;

  const { foodItems, SetAllFoodItems } = useUserFoodState();

  useEffect(() => {
    if (foodItems.length === 0) {
      getAllFoodItems().then(({ data }) => {
        SetAllFoodItems(data);
      });
    }
  });

  //const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      <CssBaseline />
      <Box display="flex" p={1} className={classes.pos}>
        <Box p={1} flexGrow={1} alignSelf="center">
          <Typography variant="h3">Padmakamal Canteen</Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} variant="fullWidth" />
      <Grow in>
        <Grid container direction="row" className={classes.gridcont}>
          <Grid container item direction="row">
            {foodItems
              .filter((obj) => obj.canteen_id === parseInt(canteenId))
              .map((fooditem, index) => {
                return (
                  <Grid key={index} item md={4} sm={6} xs={12}>
                    <FoodItem fooditem={fooditem} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grow>
    </>
  );
}

export default FoodFromCanteen;
