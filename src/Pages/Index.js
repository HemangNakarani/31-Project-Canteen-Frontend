import React from "react";
import FoodItem from "../Components/FoodItem";
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  Box,
  Fab,
  CssBaseline,
  Grow
  // useMediaQuery,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Orders from "../Components/Orders";

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

function IndexPage() {
  const classes = useStyles();
  const history = useHistory();
  //const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      <CssBaseline />
      <Box display="flex" p={1} className={classes.pos}>
        <Box p={1} flexGrow={1} alignSelf="center">
          <Typography variant="h3">
            Welcome to <span style={{ color: "red" }}>M</span>cDA's{" "}
            <span>🍕</span>
          </Typography>
        </Box>
        <Box p={1}>
          <Fab
            color="secondary"
            className={classes.fabicon}
            justify="flex-end"
            onClick={() => history.push("/cart")}
          >
            <ShoppingCart />
          </Fab>
        </Box>
        <Box p={1}>
          <Orders />
        </Box>
      </Box>
      <Divider className={classes.divider} variant="fullWidth" />
      <Grow in>
      <Grid container direction="row" className={classes.gridcont}>
        <Grid container item direction="row">
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <FoodItem></FoodItem>
          </Grid>
        </Grid>
      </Grid>
      </Grow>
    </>
  );
}

export default IndexPage;
