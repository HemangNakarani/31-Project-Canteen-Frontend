import React, { useEffect } from "react";
import FoodItem from "../Components/FoodItem";
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  Box,
  Fab,
  CssBaseline,
  Grow,
  Paper,
  IconButton,
  // useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { CancelOutlined, ShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Orders from "../Components/Orders";
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
  input: {
    width: 324,
  },
}));

function IndexPage() {
  const classes = useStyles();
  const history = useHistory();
  const {
    foodItems,
    SetAllFoodItems,
    foodItemsupdated,
    setFoodItemsUpdated,
  } = useUserFoodState();
  const [dummyFood, setDummyFood] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  function FilterList(keyword) {
    setSearchText(keyword);
    const dumdata = foodItems.filter(
      (obj) =>
        obj.name.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.description.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.canteenname.toLowerCase().includes(keyword.toLowerCase())
    );
    setDummyFood(dumdata);
  }

  useEffect(() => {
    if (!foodItemsupdated) {
      getAllFoodItems().then(({ data }) => {
        setFoodItemsUpdated();
        SetAllFoodItems(data);
      });
    }
  }, []);

  //const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <>
      <CssBaseline />
      <Box display="flex" p={1} className={classes.pos} flexWrap="wrap">
        <Box p={1} flexGrow={1} alignSelf="center">
          {searchText === "" ? (
            <Typography variant="h3">
              Welcome to <span style={{ color: "red" }}>M</span>cDA's{" "}
              <span>🍕</span>
            </Typography>
          ) : (
            <Typography variant="h3">
              <span style={{ color: "red" }}>S</span>earched Food{" "}
              <span>🍕</span>
            </Typography>
          )}
        </Box>
        <Box alignSelf="center" flexDirection="column">
          <Paper component="form" className={classes.paper}>
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              className={classes.input}
              value={searchText}
              placeholder="Search Food, About Food and Canteens..."
              onChange={(e) => FilterList(e.target.value)}
            />
          </Paper>
        </Box>
        {searchText === "" ? (
          <div></div>
        ) : (
          <Box p={1}>
            <Fab
              color="secondary"
              className={classes.fabicon}
              justify="flex-end"
              onClick={() => setSearchText("")}
            >
              <CancelOutlined />
            </Fab>
          </Box>
        )}
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
            {searchText === ""
              ? foodItems.map((fooditem, index) => {
                  return (
                    <Grid key={index} item md={4} sm={6} xs={12}>
                      <FoodItem fooditem={fooditem} />
                    </Grid>
                  );
                })
              : dummyFood.map((fooditem, index) => {
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

export default IndexPage;
