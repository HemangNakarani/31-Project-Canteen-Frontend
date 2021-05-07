import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {UPLOADPRESET,CLOUDNAME} from '../Constants';

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
import { addNewFoodItemToMenu } from "../APIs/FoodManageCalls";

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
      height: 10,
      marginTop: 2,
    },
    [theme.breakpoints.down("sm")]: {
      height: 10,
      marginTop: 2,
    },
  },

  dialoginput: {
    margin: 12,
  },
}));

function FoodManageItem() {
  const classes = useStyles();

  function UploadWidget(props) {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
        multiple: false,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        folder: "new-foods",
        clientAllowedFormats: ["png", "jpeg","jpg"],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ["local", "instagram", "facebook","google"],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === "success") {
          setUpdate({ ...update, image_url:res.info.secure_url});
        }
      }
    );

    const showWidget = () => {
      widget.open();
    };

    return (
      <div>
        <Fab
          variant="extended"
          color="primary"
          aria-label="Upload Image"
          className={classes.dialoginput}
          onClick={showWidget}
        >
          <CloudUpload className={classes.dialoginput} />
          Upload Image
        </Fab>
      </div>
    );
  }

  const [open, setOpen] = React.useState(false);

  const { AddFoodItem } = useOwnerState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChange = () => {
    addNewFoodItemToMenu(update)
      .then(({ data }) => {
        console.log(data);
        AddFoodItem(data);
      })
      .catch((err) => {
        console.log(err);
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
        <Card
          className={classes.root}
          variant="elevation"
          elevation={3}
          onClick={handleClickOpen}
        >
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
              <UploadWidget/>
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
