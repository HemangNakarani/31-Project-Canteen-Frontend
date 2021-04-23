import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserDispatch, loginUser } from "../../Context/UserContext";
import {
  TextField,
  Card,
  makeStyles,
  Typography,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { LogIn } from "../../APIs/AuthenticationCalls";
import "./Login.css";

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

function Login(props) {

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [open, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const userDispatch = useUserDispatch();


  const handleErrorOpen = () => {
    setAlertOpen(true);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  function doLogIn() {
    LogIn(details.username, details.password)
      .then(({data}) => {
          console.log(data);
          loginUser(userDispatch,history,data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        handleErrorOpen();
      });
  }


  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <Card elevation={5} className={classes.card}>
              <Typography variant="h4" className={classes.text}>
                Log In
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
                label="Password"
                name="password"
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
                required
                value={details.password}
                variant="outlined"
              />

              <button className="btn solid" onClick={() => doLogIn()}>
                Log In
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
          <div className="panel left-panel">
            <div className="content">
              <h2>
                Welcome to <span style={{ color: "red" }}>M</span>cDA's!
              </h2>
              <h3>Are you New here ?</h3>
              <p>You don't have account then sign up in just minutes.</p>
              <button
                className="btn transparent"
                onClick={() => {
                  history.push("/auth/signup");
                }}
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
