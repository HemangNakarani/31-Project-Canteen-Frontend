import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Card, Badge } from "react-bootstrap";
import "./dashboard.css";
import { useHistory } from "react-router-dom";
import Orders from "../../Assets/Orders.png";
import Menu from "../../Assets/menu.webp";
import Accounts from "../../Assets/accounts.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 70,
  },
  myBadge: {
    width: "100%",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Grid container spacing={7}>
        <Grid item xs={12} sm={6} className={classes.img}>
          <div onClick={() => history.push("/owner/live")} id="cp">
            <Card className="bg-dark text-white">
              <Card.Img src={Orders} alt="Card image" height="300px" />
              <Card.ImgOverlay>
                <Card.Title>
                  <Typography variant="h4" color="secondary">
                    Live Order Management
                  </Typography>{" "}
                  <Badge pill variant="danger">
                    +{props.notifs}
                  </Badge>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div onClick={() => history.push("/owner/menu")} id="cp">
            <Card className="bg-dark text-white">
              <Card.Img
                src={Menu}
                alt="Card image"
                style={{ height: "300px" }}
              />
              <Card.ImgOverlay>
                <Card.Title>
                  <Typography variant="h4" color="secondary">
                    Food Items/ Menu
                  </Typography>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div onClick={() => history.push("/owner/accounts")} id="cp">
            <Card className="bg-dark text-white">
              <Card.Img
                src={Accounts}
                alt="Card image"
                style={{ height: "300px" }}
              />
              <Card.ImgOverlay>
                <Card.Title>
                  <Typography variant="h4" color="secondary">
                    Accounts
                  </Typography>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
