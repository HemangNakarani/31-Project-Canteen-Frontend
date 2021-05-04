import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Whatshot, Kitchen, CheckCircle } from "@material-ui/icons";
import { AppBar, Container, Grid, Grow } from "@material-ui/core";
import { useOwnerState } from "../Context/OwnerContext";
import { getOrderByStatus } from "../APIs/LiveOrders";
import LiveOrderComponent from "../Components/LiveOrderComponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: 24,
  },
  gridmargin: {
    padding: 8,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export default function Liveorders() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const {
    pendingorders,
    cookingorders,
    completedorders,
    setPendingOrders,
    pendingordersupdated,
    setPendingOrdersUpdated,
  } = useOwnerState();

  useEffect(() => {
    if (!pendingordersupdated) {
      getOrderByStatus("Pending")
        .then(({ data }) => {
          setPendingOrders(data);
          setPendingOrdersUpdated();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          centered
          aria-label="icon label tabs example"
        >
          <Tab icon={<Whatshot />} label="Live/Pending Orders" />
          <Tab icon={<Kitchen />} label="Cooking Orders" />
          <Tab icon={<CheckCircle />} label="Completed Orders" />
        </Tabs>
      </AppBar>
      <Container maxWidth="md">
        <TabPanel value={value} index={0}>
          <Grow in>
            <Grid container className={classes.container} justify="center">
              {pendingorders.map((order, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    className={classes.gridmargin}
                  >
                    <LiveOrderComponent order={order} />
                  </Grid>
                );
              })}
            </Grid>
          </Grow>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grow in>
            <Grid container className={classes.container} justify="center">
              {cookingorders.map((order, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    className={classes.gridmargin}
                  >
                    <LiveOrderComponent order={order} />
                  </Grid>
                );
              })}
            </Grid>
          </Grow>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grow in>
            <Grid container className={classes.container} justify="center">
              {completedorders.map((order, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    className={classes.gridmargin}
                  >
                    <LiveOrderComponent order={order} />
                  </Grid>
                );
              })}
            </Grid>
          </Grow>
        </TabPanel>
      </Container>
    </>
  );
}
