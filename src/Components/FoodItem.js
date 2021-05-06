import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Fab, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { addItemToCart } from "../APIs/CartApiCalls";
import { useUserFoodState } from "../Context/UserFoodContext";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 48,
    marginLeft: 36,
    borderRadius: 25,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  div: {
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  box: {
    width: 124,
    height: 124,
    [theme.breakpoints.down("xs")]: {
      width: 64,
      height: 64,
    },
    [theme.breakpoints.down("sm")]: {
      width: 96,
      height: 96,
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  cardcontent: {
    marginTop: 64,
    [theme.breakpoints.down("xs")]: {
      marginTop: 32,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 32,
    },
  },
}));

function FoodItem(props) {
  const { fooditem } = props;
  const [loading, setLoading] = React.useState(false);
  const { AddItemToCart, cartItems } = useUserFoodState();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
    console.log("enqueueSnackbar");
  };

  const handleAdd = () => {
    setLoading(true);

    let temparr = cartItems.filter(
      (obj) => obj.cartfooditem.id === fooditem.id
    );

    if (temparr.length === 0) {
      addItemToCart(fooditem.id, 1)
        .then(({ data, status }) => {
          if (status === 208) {
            handleClickVariant(
              fooditem.name + " is already in the cart",
              "info"
            );
          } else {
            AddItemToCart(data);
            handleClickVariant(
              fooditem.name + " is added to your cart",
              "success"
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      handleClickVariant(fooditem.name + " is already in the cart", "info");
      setLoading(false);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Box display="flex" flexDirection="column">
        <Box position="absolute" flexWrap="flex-end" className={classes.box}>
          <img
            src={fooditem.image_url}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 64,
              boxShadow: "2px 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
            alt="IndexPage"
          />
        </Box>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.cardcontent}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h6" component="h2">
                  {fooditem.name}
                </Typography>
                <Typography color="textSecondary" noWrap>
                  {fooditem.description}
                </Typography>
              </Box>
              <Box p={1}>
              <Typography variant="subtitle2" align="right">{`${fooditem.canteenname}`}</Typography>
                <Rating
                  name="half-rating-read"
                  value={fooditem.stars / fooditem.number_of_rating}
                  precision={0.2}
                  readOnly
                />
                <Typography variant="subtitle2" align="right">
                  {`${fooditem.number_of_rating} Ratings`}
                </Typography>
                
              </Box>
            </Box>
          </CardContent>
          <Box display="flex" p={1} className={classes.pos}>
            <Box p={1} flexGrow={1} alignSelf="center">
              <Typography variant="h4">{`₹${fooditem.basePrise}`}</Typography>
            </Box>
            <Box p={1}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Fab
                  color="secondary"
                  justify="flex-end"
                  size="small"
                  onClick={handleAdd}
                >
                  <Add />
                </Fab>
              )}
            </Box>
            {/* <Box p={1}>
              <Fab color="secondary" justify="flex-end" size="small">
                <Whatshot />
              </Fab>
            </Box> */}
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default FoodItem;
