import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useUserDispatch, loginUser } from "../../Context/UserContext";
import {
  Card,
  makeStyles,
  Typography,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { LogIn, ForgotPassword } from "../../APIs/AuthenticationCalls";
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
  const [dialogopen, setDialogOpen] = React.useState(false);
  const [mailsent, setMailsent] = useState(true);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const userDispatch = useUserDispatch();

  const handleErrorOpen = () => {
    setAlertOpen(true);
  };

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSend = () => {
    setMailsent(false);
    setDialogOpen(false);

    ForgotPassword(email)
      .then(({ data }) => {
        setErrorMessage(data);
        handleErrorOpen();
        setMailsent(true);
      })
      .catch((err) => {
        setMailsent(true);
        setErrorMessage(err.response.data.message || "Something Went Wrong !!");
        handleErrorOpen();
      });
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  function doLogIn() {
    LogIn(details.username, details.password)
      .then(({ data }) => {
        loginUser(userDispatch, history, data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message || "Something Went Wrong !!");
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
              {mailsent ? (
                <Typography onClick={handleDialogClickOpen}>
                  Forgot Password?
                </Typography>
              ) : (
                <CircularProgress color="secondary" />
              )}
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
        <Dialog
          open={dialogopen}
          onClose={handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter Email ID to send Reset Password Mail
            </DialogContentText>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ marginTop: "48px", marginBottom: "48px" }}
            >
              <Grid item>
                <TextField
                  required
                  id="reset_email"
                  label="Enter registered Email"
                  variant="outlined"
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDialogSend}
              color="secondary"
              variant="contained"
            >
              Send Mail
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Login;
