import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grow,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Orders from "../Assets/Orders.jpg";
import Menu from "../Assets/menu.webp";
import Accounts from "../Assets/accounts.jpg";
import Profile from "../Assets/Profile.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 300,
    margin: 16,
  },
  media: {
    height: 250,
  },
  typography: {
    textDecoration: "None",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Grow in>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card
              className={classes.card}
              elevation={5}
              onClick={() => history.push("/owner/live")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Orders}
                  title="Live Orders"
                />
                <CardContent>
                  <Typography
                    className={classes.typography}
                    align="center"
                    variant="h4"
                  >
                    Live Order Management
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.card}
              elevation={5}
              onClick={() => history.push("/owner/manage")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Menu}
                  title="Food Management"
                />
                <CardContent>
                  <Typography
                    className={classes.typography}
                    align="center"
                    variant="h4"
                  >
                    Food Menu Management
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item  xs={12} md={6}>
            <Card
              className={classes.card}
              elevation={5}
              onClick={() => history.push("/owner/accounts")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Accounts}
                  title="Accounts"
                />
                <CardContent>
                  <Typography
                    className={classes.typography}
                    align="center"
                    variant="h4"
                  >
                    Accounts
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item  xs={12} md={6}>
            <Card
              className={classes.card}
              elevation={5}
              onClick={() => history.push("/owner/profile")}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Profile}
                  title="Profile"
                />
                <CardContent>
                  <Typography
                    className={classes.typography}
                    align="center"
                    variant="h4"
                  >
                    Profile
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grow>
    </>
  );
}
