import React from "react";
import {
  Button,
  Typography,
  Paper,
  makeStyles,
  CardContent,
  IconButton,
  useTheme,
  Grid,
} from "@material-ui/core";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@material-ui/icons";
import { deleteCartItem,increaseCartItemApi,decreaseCartItemApi } from "../APIs/CartApiCalls";
import { useUserFoodState } from "../Context/UserFoodContext";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "100%",
    padding: 16,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const CartItem = (props) => {

  const {
    RemoveCartItem,
    IncreaseCartItem,
    DecreaseCartItem,
  } = useUserFoodState();

  const { id, quantity, cartfooditem } = props;

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
    console.log("enqueueSnackbar");
  };

  const handleRemove = () => {
    deleteCartItem(id)
      .then(({ data }) => {
        handleClickVariant(cartfooditem.name + " is removed succesfully", "success");
        RemoveCartItem(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIncrease = ()=>{

    increaseCartItemApi(id)
    .then(({data})=>{
      console.log(data);
      IncreaseCartItem(id);
    })
    .catch(err=>{
      console.log(err);
    })
    
  }

  const handleDecrease = ()=>{

    decreaseCartItemApi(id)
    .then(({data})=>{
      console.log(data);
      DecreaseCartItem(id);
    })
    .catch(err=>{
      console.log(err);
    })

  }

  return (
    <Paper variant="outlined" className={classes.root} identifier="cy_cart_item">
      <Grid container alignItems="center" direction="row">
        <Grid item md={3} sm={3} xs={12}>
          <img
            className={classes.cover}
            src={cartfooditem.image_url}
            title={cartfooditem.name}
            alt={cartfooditem.name}
          />
        </Grid>
        <Grid item md={9} sm={9} xs={12}>
          <div>
            <CardContent>
              <Typography component="h5" variant="h5">
                {cartfooditem.name}
              </Typography>
              <Typography variant="subtitle1" color="secondary" identifier="cy_cart_prizetag">
              ₹ {cartfooditem.basePrise}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {cartfooditem.description}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton
                aria-label="inc"
                onClick={handleIncrease}
              >
                {theme.direction === "rtl" ? (
                  <RemoveCircleOutlineRounded />
                ) : (
                  <AddCircleOutlineRounded />
                )}
              </IconButton>
              <Typography variant="h5" color="textPrimary" identifier="cy_cart_quantity">
                {quantity}
              </Typography>
              <IconButton
                aria-label="dec"
                onClick={handleDecrease}
              >
                {theme.direction === "rtl" ? (
                  <AddCircleOutlineRounded />
                ) : (
                  <RemoveCircleOutlineRounded />
                )}
              </IconButton>
              <Button
                identifier="cy_cart_remove_item"
                variant="contained"
                color="primary"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
