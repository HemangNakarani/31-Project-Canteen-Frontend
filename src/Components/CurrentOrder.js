import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box, Fab, Dialog } from "@material-ui/core";
import { CheckCircle, Payment } from "@material-ui/icons";
import moment from "moment";
import FoodItem from "../Components/FoodItem";

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

function SimpleDialog(props) {
  const { onClose, open, fooditem } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <FoodItem fooditem={fooditem} />
    </Dialog>
  );
}

export default function MediaControlCard({ order }) {
  const { cartfooditem, status, createdAt, undatedAt, paid, amount } = order;
  const classes = useStyles();

  const [dialogopen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (value) => {
    setDialogOpen(false);
  };

  moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

  return (
    <div>
      <SimpleDialog
        fooditem={cartfooditem}
        open={dialogopen}
        onClose={handleDialogClose}
      />

      <Card className={classes.root} elevation={3} onClick={handleDialogOpen}>
        <Box display="flex" p={1}>
          <Box p={1} alignSelf="center">
            <Typography variant="h5">{cartfooditem.name}</Typography>
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
            <Typography color="secondary" variant="subtitle1">
              {status}
            </Typography>
          </Box>
          <Box p={1} display="flex" alignItems="center">
            <Typography variant="h3" align="center">
              {`₹${amount}`}
            </Typography>
          </Box>
          <Box p={1} flexGrow={1} display="flex" alignItems="center">
            <Fab color="secondary" aria-label="edit" size="small">
              {paid ? <CheckCircle /> : <Payment />}
            </Fab>
          </Box>
          <Box p={1}>
            <img
              className={classes.image}
              src={cartfooditem.image_url}
              alt="OrderItem"
            />
          </Box>
        </Box>
      </Card>
    </div>
  );
}
