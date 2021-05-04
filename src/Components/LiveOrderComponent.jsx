import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Fab } from "@material-ui/core";
import { AssignmentTurnedIn } from "@material-ui/icons";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX:"scroll",
    scrollbarWidth: "none"
  },
  details: {},
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
    height: 200,
  },
  fab: {
    margin: 8,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function LiveOrderComponent({ order }) {
  const classes = useStyles();

  const { cartfooditem, createdAt, undatedAt, paid, amount, quantity } = order;

  moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

  return (
    <Card className={classes.root} elevation={5}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {cartfooditem.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{ marginBottom: 24 }}
            >
              {cartfooditem.description}
            </Typography>
            Quantity<Typography variant="h4">{quantity}</Typography>
          </CardContent>
        </Box>
        <Box p={1} flexGrow={1} alignSelf="center">
          <CardContent className={classes.content}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >{`Ordered ${moment(
              createdAt,
              moment.defaultFormat
            ).fromNow()}`}</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >{`Last Updated ${moment(
              undatedAt,
              moment.defaultFormat
            ).fromNow()}`}</Typography>
            <Typography>
                {`Income: ₹${amount}/-`}
            </Typography>
          </CardContent>
        </Box>
        <Box p={1} display="flex" flexDirection="column" alignSelf="center">
          <Box>
            <Fab variant="extended" color="secondary" className={classes.fab}>
              <AssignmentTurnedIn className={classes.icon} />
              Accept Order
            </Fab>
          </Box>
          <Box>
            <Fab variant="extended" className={classes.fab}>
              <CancelPresentationIcon className={classes.icon} />
              Reject Order
            </Fab>
          </Box>
          <Box alignSelf="center">
            <Fab variant="extended" size="small" className={classes.fab} >
              {`Paid: ${paid ? "YES" : "NO"}`}
            </Fab>
          </Box>
        </Box>
        <Box p={1}>
          <img
            className={classes.cover}
            alt={cartfooditem.name}
            src={cartfooditem.image_url}
            title={cartfooditem.name}
          />
        </Box>
      </Box>
    </Card>
  );
}
