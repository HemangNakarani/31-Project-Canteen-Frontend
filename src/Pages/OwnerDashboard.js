import React from "react";
import Dashboard from "../Components/OwnerDashboardComp";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  useScrollTrigger,
  Typography,
  Box,
  Fab,
} from "@material-ui/core";

import { PowerSettingsNew, OfflineBolt } from "@material-ui/icons";

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

function OwnerDashboard(props) {
  // const [state, setState] = useState({
  //   canteenName: "PadmaKamal Caterers",
  //   notifs: 10,
  // });

  const [canteenopen, setCanteenOpen] = React.useState(true);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              p={1}
              m={1}
              style={{ width: "100%" }}
            >
              <Box flexGrow={1} alignItems="center">
                <Typography variant="h6">
                  Canteenia's Management Console
                </Typography>
              </Box>
              <Box>
                <Fab
                  variant="round"
                  color="secondary"
                  onClick={() => setCanteenOpen(!canteenopen)}
                >
                  {canteenopen ? <PowerSettingsNew /> : <OfflineBolt />}
                </Fab>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container maxWidth="md" style={{ marginTop: 48 }}>
        <Box>
          <Dashboard notifs={10} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default OwnerDashboard;
