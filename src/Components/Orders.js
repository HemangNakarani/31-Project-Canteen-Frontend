import React, { useEffect } from "react";

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
  Grow,
  Container,
} from "@material-ui/core";
import { OutdoorGrillRounded, Close as CloseIcon } from "@material-ui/icons";
import CurrentOrder from "../Components/CurrentOrder";
import { myCurrentOrders } from "../APIs/CartApiCalls";
import { useUserFoodState } from "../Context/UserFoodContext";

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
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Orders({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { SetAllCurrentOrders, mycurrentorders } = useUserFoodState();

  useEffect(() => {
    if (mycurrentorders.length === 0) {
      myCurrentOrders()
        .then(({ data }) => {
          SetAllCurrentOrders(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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
        <Grow in>
          <Container maxWidth="md">
            <Grid container justify="center">
              {mycurrentorders.map((ord, ind) => {
                return (
                  <Grid
                    key={ind}
                    item
                    xs={12}
                    md={12}
                    className={classes.order}
                  >
                    <CurrentOrder order={ord} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Grow>
      </Dialog>
    </div>
  );
}
