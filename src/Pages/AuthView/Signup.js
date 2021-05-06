import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";
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
    if (
      !validator.isEmail(details.email) ||
      details.password.trim().length < 6 ||
      details.username.trim().length === 0
    ) {
      if (details.username.trim().length === 0) {
        setErrorMessage("Username can't be empty");
      } else if (!validator.isEmail(details.email)) {
        setErrorMessage("Enter Valid E-mail");
      } else if (details.password.trim().length < 6) {
        setErrorMessage("Password must be atleast 6 characters long");
      }

      handleErrorOpen();
    } else if (details.email.split("@")[1] !== "daiict.ac.in") {
      setErrorMessage("Sign Up using only DAIICT E-mail Id");
      handleErrorOpen();
    } else {
      SignUp(details.username, details.email, details.password)
        .then((data) => {
          history.push("/auth/login");
        })
        .catch((err) => {
          setErrorMessage(
            err.response.data.message || "Something went wrong !"
          );
          handleErrorOpen();
        });
    }
  }

  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
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
                helperText={
                  details.username.trim().length === 0 ? "Enter Username" : ""
                }
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
                helperText={
                  !validator.isEmail(details.email) ? "Enter valid email !" : ""
                }
                required
                value={details.email}
                variant="outlined"
              />
              <TextField
                color="secondary"
                type="password"
                className={classes.text}
                label="Password"
                name="password"
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
                helperText={
                  details.password.trim().length < 6
                    ? "Password length must be atleast 6"
                    : ""
                }
                required
                value={details.password}
                variant="outlined"
              />

              <button className="btn solid" onClick={() => doSignUp()}>
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
          <div className="panel left-panel">
            <div className="content">
              <h2>
                Welcome to <span style={{ color: "red" }}>M</span>cDA's!
              </h2>

              <p>Login Here </p>

              <button
                className="btn transparent"
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
