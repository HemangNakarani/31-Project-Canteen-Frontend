import React, { Fragment } from "react";
import CartItem from "./CartItem";
import { useCartContext } from "../Context/CartContext";
import {
  Button,
  Typography,
  Grid,
  Container,
  Divider,
  Box,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { sendMessage } from "../Layouts/User";
// import { Pay } from "../APIs/PaymentService";
import { useUserState } from "../Context/UserContext";

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
  const { cart, total, clearCart, loading } = useCartContext();
  const classes = useStyles();
  const { name } = useUserState();

  const handlePayment = () => {
    // window.open(
    //   Pay("vsdfs2d45vsgs", 500, "sfg4t5cvzxsrgwe8ni284we4rqt7dbg"),
    //   "Payment Kr",
    //   "height=800,width=800,modal=yes,alwaysRaised=yes"
    // );

    sendMessage("Helllo From App !!", name);
  };

  if (cart.length === 0) {
    return (
      <>
        <Container maxWidth="md">
          <Typography variant="h4">Your bag</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            is currently empty
          </Typography>
        </Container>
      </>
    );
  }
  return loading ? (
    <Fragment>
      <Typography>Loading...</Typography>
    </Fragment>
  ) : (
    <>
      <Container maxWidth="md">
        <Typography variant="h4">Your bag</Typography>
        <Grid container>
          {cart.map((item,ikey) => {
            if (item.amount > 0) {
              return (
                <Grid key={ikey}>
                  <CartItem  {...item} />
                </Grid>
              );
            } else {
              return <div key={ikey} />;
            }
          })}
        </Grid>

        <Divider className={classes.divider} variant="fullWidth" />

        <Box display="flex">
          <Box p={1} flexGrow={1}>
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
          <Box p={1} flexGrow={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePayment}
            >
              Checkout
            </Button>
          </Box>
          <Box p={1}>
            <Paper variant="outlined" className={classes.total}>
              <Typography variant="h5">
                Total {":>"} <span>{total}</span>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CartContainer;
