import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes.js";
import { OwnerProvider } from "../Context/OwnerContext";
import { useUserDispatch, signOut } from "../Context/UserContext";
import { useOwnerState } from "../Context/OwnerContext";
import { getOrderByStatus } from "../APIs/LiveOrders";
import { SnackbarProvider, useSnackbar } from "notistack";

const SERVER_URL = process.env.REACT_APP_SERVER_URI || "http://localhost:8080";
var stompClient = null;

const sendMessage = (msg, username) => {
  if (msg.trim() !== "") {
    const message = {
      userid: "18",
      username: username,
      message: msg,
    };
    stompClient.send("/app/chat", {}, JSON.stringify(message));
  }
};

export { sendMessage };

function Owner() {
  return (
    <SnackbarProvider maxSnack={5}>
      <OwnerProvider>
        <NotOwner />
      </OwnerProvider>
    </SnackbarProvider>
  );
}

function NotOwner(props) {
  const userDispatch = useUserDispatch();
  const canteen_id = localStorage.getItem("canteen_id");
  const { setPendingOrders } = useOwnerState();
  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (message,variant) => {
    enqueueSnackbar(message, { variant });
    console.log("enqueueSnackbar");
  };

  const handleNewOrder = () => {
    getOrderByStatus("Pending")
      .then(({ data }) => {
        setPendingOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMessageReceived = ({ body: msg }) => {
    let originalmessage = JSON.parse(msg);

    console.log("originalmessage-socketowner");
    if (originalmessage.tag === "NEW_ORDER") {
      handleNewOrder();
      handleClickVariant("New Order from " + originalmessage.username ,'success')
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
          `/user/canteen-${canteen_id}/queue/messages`,
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

  useEffect(connect, [props.history, userDispatch, canteen_id]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/owner") {
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
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/owner/dashboard" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default Owner;
