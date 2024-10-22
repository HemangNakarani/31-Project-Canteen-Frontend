import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import routes from "../routes.js";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GitHubIcon from "@material-ui/icons/GitHub";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import SettingsIcon from "@material-ui/icons/Settings";
import FaceIcon from "@material-ui/icons/Face";
import { useUserDispatch, signOut, useUserState } from "../Context/UserContext";
import { UserFoodProvider, useUserFoodState } from "../Context/UserFoodContext";
import { checkOutTheCart } from "../APIs/CartApiCalls";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ShoppingCart } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SERVER_URL = process.env.REACT_APP_SERVER_URI || "http://localhost:8080";
var stompClient = null;

const sendMessageOwner = (msg, username) => {
  if (msg.trim() !== "") {
    const message = {
      userid: "18",
      username: username,
      message: msg,
    };
    stompClient.send("/app/chat", {}, JSON.stringify(message));
  }
};

export { sendMessageOwner };

function User() {
  return (
    <SnackbarProvider maxSnack={5}>
      <UserFoodProvider>
        <NotUser />
      </UserFoodProvider>
    </SnackbarProvider>
  );
}

function NotUser(props) {
  const history = useHistory();
  const userDispatch = useUserDispatch();
  const { name } = useUserState();
  const {
    ClearCart,
    UpdateCurrentOrders,
    updateCurrentOrderItem,
  } = useUserFoodState();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
    console.log("enqueueSnackbar");
  };

  const handleCheckout = (uuid) => {
    checkOutTheCart(uuid)
      .then(({ data }) => {
        UpdateCurrentOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMessageReceived = ({ body: msg }) => {
    let originalmessage = JSON.parse(msg);

    if (
      originalmessage.tag === "PAYMENT" &&
      originalmessage.message === "Payment Successful"
    ) {
      ClearCart();
      handleCheckout(originalmessage.userid);
    } else if (originalmessage.tag === "ORDER_UPDATE") {
      let orderobj = JSON.parse(originalmessage.message);
      handleClickVariant(
        `Order Updated by ${originalmessage.username}`,
        "info"
      );
      updateCurrentOrderItem(orderobj);
    }
  };

  const connect = () => {
    const Stomp = require("stompjs");

    var SockJS = require("sockjs-client");

    SockJS = new SockJS(`${SERVER_URL}/websocket/`);

    stompClient = Stomp.over(SockJS);

    stompClient.debug = () => {};

    stompClient.connect(
      { "X-Authorization": "Bearer " + localStorage.getItem("token") },
      () => {
        stompClient.subscribe(
          `/user/${name}/queue/messages`,
          onMessageReceived
        );
      },
      (err) => {
        if (err.headers !== undefined) {
          if (
            err.headers["message"] ===
            "Failed to send message to ExecutorSubscribableChannel[clientInboundChannel]; nested exception is java.lang.SecurityException\\c INVALID TOKEN"
          ) {
            signOut(userDispatch, props.history);
          }
        }
      }
    );
  };

  useEffect(connect, [props.history, userDispatch, name]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            <span style={{ color: "red" }}>M</span>cDA's Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Menu" onClick={() => history.push("/index")}>
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem
            button
            key="Canteens"
            onClick={() => history.push("/canteens")}
          >
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Canteens" />
          </ListItem>
          <ListItem button key="Cart" onClick={() => history.push("/cart")}>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem
            button
            key="Settings"
            onClick={() => history.push("/settings")}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key={"Profile"}
            onClick={() => history.push("/profile")}
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            key={"Github"}
            onClick={() => {
              window.open(
                "https://github.com/HemangNakarani/31-Project-Canteen-Frontend",
                "OSS",
                "height=800,width=800,modal=yes,alwaysRaised=yes"
              );
            }}
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="Github" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/index" />
            </Switch>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default User;
