import React, { useEffect } from "react";
import { Grid, Grow, Paper, Typography, makeStyles } from "@material-ui/core";

import FoodManageItem from "../Components/FoodManageItem";
import AddNewFoodItem from "../Components/AddNewFoodItem";
import { useOwnerState } from "../Context/OwnerContext";
import { getFoodItemsOfMyCanteen } from "../APIs/FoodManageCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 24,
  },

  title: {
    margin: 16,
    padding: 8,
    opacity: 0.9,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 12,
  },

  card: {
    margin: 16,
    padding: 8,
  },
}));

export default function FoodManage() {
  const classes = useStyles();

  const {
    foodItems,
    setMyFoodItems,
    setMyFoodItemsUpdated,
    myfoodItemsupdated,
  } = useOwnerState();

  useEffect(() => {
    if (!myfoodItemsupdated) {
      getFoodItemsOfMyCanteen()
        .then(({ data }) => {
          setMyFoodItemsUpdated();
          setMyFoodItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Paper className={classes.title} variant="outlined">
        <Typography variant="h2" align="center" color="primary">
          Console to Manage Your Food
        </Typography>
      </Paper>
      <Paper variant="outlined" className={classes.card}>
        <Grow in>
          <Grid container className={classes.root}>
            <Grid item md={6} xs={12} key="Add">
              <AddNewFoodItem />
            </Grid>
            {foodItems.map((item, ind) => {
              return (
                <Grid item md={6} xs={12} key={ind}>
                  <FoodManageItem index={ind} item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Grow>
      </Paper>
    </>
  );
}
