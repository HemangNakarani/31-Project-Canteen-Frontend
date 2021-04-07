import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { SignUp } from "../../APIs/AuthenticationCalls";
import {
  TextField,
  Card,
  makeStyles,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 8,
    "&:hover, &:focus": {
      color: theme.palette.secondary.main,
    },
  },
  card: {
    margin: "4em",
    paddingTop: "2em",
    paddingBottom: "2em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: "0.6em",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SignupPage(props) {

  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [open, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleErrorOpen = () => {
    setAlertOpen(true);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  function doSignUp() {
    SignUp(details.username, details.email, details.password)
      .then((data) => {
        history.push("/auth/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        handleErrorOpen();
      });
  }

  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <Card elevation={5} className={classes.card}>
              <Typography variant="h4" className={classes.text}>
                SignUp
              </Typography>
              <TextField
                color="secondary"
                className={classes.text}
                label="Username"
                name="username"
                onChange={(e) => {
                  setDetails({ ...details, username: e.target.value });
                }}
                required
                value={details.username}
                variant="outlined"
              />
              <TextField
                color="secondary"
                className={classes.text}
                label="Email"
                name="email"
                onChange={(e) => {
                  setDetails({ ...details, email: e.target.value });
                }}
                required
                value={details.email}
                variant="outlined"
              />
              <TextField
                color="secondary"
                className={classes.text}
                label="Password"
                name="password"
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
                required
                value={details.password}
                variant="outlined"
              />

              <button class="btn solid" onClick={() => doSignUp()}>
                Sign Up
              </button>
            </Card>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleErrorClose}
            >
              <Alert onClose={handleErrorClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>

        <div className="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h2>
                Welcome to <span style={{ color: "red" }}>M</span>cDA's!
              </h2>

              <p>Login Here </p>

              <button
                class="btn transparent"
                onClick={() => {
                  history.push("/auth/login");
                }}
                id="sign-up-btn"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
