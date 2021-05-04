import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
  },
  media: {
    height: 140,
  },
});

export default function Canteen(props) {
  const classes = useStyles();
  const history = useHistory();

  const { canteenName, altName, opened, id } = props;
  var ImagePath = require(`../Assets/burger.png`).default;

  return (
    <Card className={classes.root} onClick={()=>{
        history.push(`/canteens/${id}`)
    }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ImagePath}
          title={altName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {canteenName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            <Rating
              name="half-rating-read"
              defaultValue={4.2}
              precision={0.5}
              readOnly
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          {displayOpenStatus(opened)}
        </Button>
        <Button size="small" color="secondary">
          {displayOffer("25% OFF")}
        </Button>
      </CardActions>
    </Card>
  );
}

function displayOpenStatus(open) {
  if (open) {
    return "Open Now";
  } else {
    return "Closed";
  }
}

function displayOffer(offer) {
  if (offer) {
    return offer + " Hurry UP!";
  } else {
    return null;
  }
}
