import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { useUserState } from "../../Context/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 24,
  },
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const { name, email, role } = useUserState();

  const [values, setValues] = useState({
    username: name,
    email: email,
    role: role,
  });

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your Username"
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                label="Email Address (Read Only)"
                name="email"
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                label="Role (Read Only)"
                name="role"
                required
                value={values.role}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              alert("Nahi Karni Details Save Tumhari!!!");
            }}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
