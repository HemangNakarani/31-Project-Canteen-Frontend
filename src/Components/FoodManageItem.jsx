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
import { CheckCircle, Settings, CloudUpload } from "@material-ui/icons";

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

  dialoginput: {
    margin: 12,
  },
}));

function FoodManageItem({ index, item }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const { UpdateFoodItem } = useOwnerState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChange = () => {
    UpdateFoodItem(index, {
      ...item,
      description: update.description,
      basePrise: update.basePrise,
      image_url: update.image_url,
    });
    setOpen(false);
  };

  const [update, setUpdate] = useState({
    description: item.description,
    basePrise: item.basePrise,
    image_url: item.image_url,
  });

  return (
    <div className={classes.div}>
      <Box display="flex" flexDirection="column">
        <Box position="absolute" flexWrap="flex-end" className={classes.box}>
          <img
            src={item.image_url}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 64,
              boxShadow: "2px 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
            alt="IndexPage"
          />
        </Box>
        <Card className={classes.root} variant="elevation" elevation={3}>
          <CardContent className={classes.cardcontent}>
            <Typography variant="h6" component="h2">
              {item.name}
            </Typography>
            <Typography color="textSecondary" noWrap>
              {item.description}
            </Typography>
          </CardContent>
          <Box display="flex" p={1} className={classes.pos}>
            <Box p={1} flexGrow={1} alignSelf="center">
              <Typography variant="h4">{`${item.basePrise}$`}</Typography>
            </Box>
            <Box p={1}>
              <Fab
                color="secondary"
                justify="flex-end"
                size="medium"
                onClick={handleClickOpen}
              >
                <Settings />
              </Fab>
            </Box>
            <Box p={1}>
              <Fab color="secondary" justify="flex-end" size="medium">
                <CheckCircle />
              </Fab>
            </Box>
          </Box>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Food</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify Food Items here to show on user Dashboard
          </DialogContentText>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TextField
                required
                id="food-discri"
                label="Discription"
                defaultValue={update.description}
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
                defaultValue={update.basePrise}
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
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FoodManageItem;
