import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  useUserDispatch,
  signOut,
  useUserState,
} from "../../Context/UserContext";
import { useHistory } from "react-router-dom";
import { UPLOADPRESET, CLOUDNAME } from "../../Constants";
import { changeDp } from "../../APIs/AuthenticationCalls";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ForgotPassword } from "../../APIs/AuthenticationCalls";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Fab,
  Tooltip,
} from "@material-ui/core";

import { VpnKey, PowerOff } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 24,
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  var userDispatch = useUserDispatch();
  const history = useHistory();
  var { name, email } = useUserState();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(false);
  const [mailsent, setMailsent] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({
    avatar: localStorage.getItem("profile_pic"),
    city: "DAIICT-Gandhinagar,",
    country: "India",
    jobTitle: "Engineer",
    name: "Katarina Smith",
    timezone: "GMT+5:30",
  });

  const handleSetDp = (profile_pic) => {
    changeDp(profile_pic)
      .then(({ data }) => {
        setUser({ ...user, avatar: profile_pic });
        localStorage.setItem("profile_pic", profile_pic);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDialogSend = () => {
    setMailsent(false);
    setOpen(false);

    ForgotPassword(email)
      .then(({ data }) => {
        alert(data);
        setMailsent(true);
        signOut(userDispatch, history);
      })
      .catch((err) => {
        setMailsent(true);
        alert(err.response.data.message || "Something Went Wrong !!");
      });
  };

  function UploadWidget(props) {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
        multiple: false,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        folder: "profiles",
        clientAllowedFormats: ["png", "jpeg"],
        maxFileSize: 7000000,
        maxImageFileSize: 3500000,
        maxVideoFileSize: 40000000,
        maxImageWidth: 2000,
        maxImageHeight: 2000,
        sources: ["local", "instagram", "facebook"],
      },
      (err, res) => {
        if (err) console.log(err);
        if (res.event === "success") {
          handleSetDp(res.info.secure_url);
        }
      }
    );

    const showWidget = () => {
      widget.open();
    };

    return (
      <div>
        <Button variant="contained" color="secondary" onClick={showWidget}>
          Upload picture
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={user.avatar} />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${user.city} ${user.country}`}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {`${moment().format("hh:mm A")}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <Box display="flex">
          <Box flexGrow={1} m={2} alignSelf="center">
            <UploadWidget />
          </Box>
          <Box m={2}>
            {mailsent ? (
              <Tooltip title="Change Password" aria-label="ChangePass">
                <Fab color="secondary" onClick={handleClickOpen}>
                  <VpnKey />
                </Fab>
              </Tooltip>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Box>
          <Box m={2}>
            <Tooltip title="LogOut" aria-label="Logout">
              <Fab
                color="secondary"
                onClick={() => {
                  signOut(userDispatch, history);
                }}
              >
                <PowerOff />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Conform Change Password?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be logOut and mail will be sent to you ro reset your
            password
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={handleDialogSend} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
