import React from "react";
import PropTypes from "prop-types";
import Dashboard from "../Components/Owners/Dashboard";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  useScrollTrigger,
  Typography,
  Box,
} from "@material-ui/core";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function OwnerDashboard(props) {
  // const [state, setState] = useState({
  //   canteenName: "PadmaKamal Caterers",
  //   notifs: 10,
  // });
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">PadmaKamal Canteen</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box>
          <Dashboard notifs={10} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default OwnerDashboard;
