import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useUserFoodState } from "../Context/UserFoodContext";

import {
  Typography,
  Grid,
  Container,
  Divider,
  Box,
  makeStyles,
  Paper,
  Grow,
  Fab,
} from "@material-ui/core";
import { Payment } from "@material-ui/icons";
import { useUserState } from "../Context/UserContext";
import { getAllCartItems } from "../APIs/CartApiCalls";
import { generate_UUID } from "../Utils";
import { Pay } from "../APIs/PaymentService";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 32,
    marginBottom: 16,
  },
  total: {
    padding: 8,
  },
}));

const CartContainer = () => {
  const {
    cartItems,
    SetAllCartItems,
    carttotal,
    cartItemsupdated,
    setCartItemsUpdated,
  } = useUserFoodState();

  const classes = useStyles();
  const { name } = useUserState();

  useEffect(() => {
    if (!cartItemsupdated) {
      getAllCartItems().then(({ data }) => {
        console.log(data);
        setCartItemsUpdated(true);
        SetAllCartItems(data);
      });
    }
  }, []);

  const handlePayment = () => {
    window.open(
      Pay(name, carttotal, `${name}-${generate_UUID()}`),
      "Payment Kr",
      "height=800,width=800,modal=yes,alwaysRaised=yes"
    );
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Container maxWidth="md">
          <Typography variant="h4">Your bag</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            is currently empty, Order Your Food Now
          </Typography>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4">Your bag</Typography>
        <Grow in>
          <Grid container>
            {cartItems.map((item, ikey) => {
              return (
                <Grid item key={ikey} md={12}>
                  <CartItem {...item} />
                </Grid>
              );
            })}
          </Grid>
        </Grow>
        <Divider className={classes.divider} variant="fullWidth" />

        <Box display="flex">
          <Box p={1} flexGrow={1}>
            <Fab variant="extended" onClick={handlePayment} color="secondary">
              <Payment />- Pay & Checkout
            </Fab>
          </Box>
          <Box p={1}>
            <Paper variant="outlined" className={classes.total}>
              <Typography variant="h5">
                Total {": ₹"} <span>{carttotal}</span>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CartContainer;
