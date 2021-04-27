import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Burger from "../Assets/burger.png";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  image: {
    height: 96,
    width: 96,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1} alignSelf="center">
          <Typography variant="h5">Chai</Typography>
          <Typography variant="subtitle1">Ordered at: 9:48 am</Typography>
          <Typography color="textSecondary" variant="subtitle2">
            In queue...
          </Typography>
        </Box>
        <Box p={1}>
          <img className={classes.image} src={Burger} alt="OrderItem" />
        </Box>
      </Box>
    </Card>
  );
}
