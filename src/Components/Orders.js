import React from "react";

import {
  Typography,
  makeStyles,
  AppBar,
  Fab,
  Dialog,
  Toolbar,
  IconButton,
  Slide,
  Grid,
} from "@material-ui/core";
import { OutdoorGrillRounded, Close as CloseIcon } from "@material-ui/icons";
import CurrentOrder from "../Components/CurrentOrder";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    padding: 24,
  },
  order: {
    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Orders({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab
        color="secondary"
        className={classes.fabicon}
        justify="flex-end"
        onClick={handleClickOpen}
      >
        <OutdoorGrillRounded />
      </Fab>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Orders
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
          <Grid item md={4} sm={6} xs={12} className={classes.order}>
            <CurrentOrder />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
