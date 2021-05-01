import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { AddCircle, CloudUpload } from "@material-ui/icons";

import { useOwnerState } from "../Context/OwnerContext";

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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  cardcontent: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      height: 128,
      marginTop: 32,
    },
    [theme.breakpoints.down("sm")]: {
      height: 128,
      marginTop: 32,
    },
  },

  dialoginput: {
    margin: 12,
  },
}));

function FoodManageItem({ index, item }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { AddFoodItem, foodItems } = useOwnerState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChange = () => {
    AddFoodItem({
      id: foodItems.length,
      name: update.name,
      description: update.description,
      basePrise: update.basePrise,
      available: true,
      image_url:
        "https://m.media-amazon.com/images/I/41nnn+i+pZL.jpg",
      stars: 0,
      number_of_rating: 0,
      canteen_id: 1,
    });

    setOpen(false);

  };

  const [update, setUpdate] = useState({
    name: "",
    description: "",
    basePrise: "",
    image_url: "",
  });

  return (
    <div className={classes.div}>
      <Box display="flex" flexDirection="column">
        <Card className={classes.root} variant="elevation" elevation={3} onClick={handleClickOpen}>
          <CardContent className={classes.cardcontent}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Box p={1}>
                <Typography variant="h4">Add New Item</Typography>
              </Box>
              <Box p={1}>
                <Fab
                  color="secondary"
                  justify="flex-end"
                  size="medium"
                  onClick={handleClickOpen}
                >
                  <AddCircle />
                </Fab>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Food</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Add Food Item to show on User Dashboard
          </DialogContentText>
          <Grid container direction="column" alignItems="center">
          <Grid item>
              <TextField
                required
                id="food-name"
                label="Name"
                defaultValue=""
                variant="outlined"
                className={classes.dialoginput}
                onChange={(e) => {
                  setUpdate({ ...update, name: e.target.value });
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="food-discri"
                label="Discription"
                defaultValue=""
                variant="outlined"
                className={classes.dialoginput}
                onChange={(e) => {
                  setUpdate({ ...update, description: e.target.value });
                }}
              />
            </Grid>
            <Grid>
              <TextField
                required
                id="food-prize"
                label="Prize"
                type="number"
                variant="outlined"
                defaultValue=""
                className={classes.dialoginput}
                onChange={(e) => {
                  setUpdate({ ...update, basePrise: e.target.value });
                }}
              />
            </Grid>
            <Grid display="flex">
              <Fab
                variant="extended"
                color="primary"
                aria-label="Upload Image"
                className={classes.dialoginput}
              >
                <CloudUpload className={classes.dialoginput} />
                Upload Image
              </Fab>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChange}
            color="secondary"
            variant="contained"
          >
            Add To The Menu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FoodManageItem;
