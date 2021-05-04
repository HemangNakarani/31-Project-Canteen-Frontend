import React from "react";
import { getCanteenDetails } from "../APIs/AuthenticationCalls";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        name: localStorage.name,
        email: localStorage.email,
        id: localStorage.id,
        role: localStorage.role,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("id"),
    role: localStorage.getItem("role"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

function loginUser(dispatch, history, response) {
  localStorage.setItem("token", response.accessToken);
  localStorage.setItem("name", response.username);
  localStorage.setItem("email", response.email);
  localStorage.setItem("id", response.id);
  localStorage.setItem("role", response.roles[0]);

  if (response.roles[0] === "ROLE_OWNER") {
    getCanteenDetails()
      .then(({ data }) => {
        localStorage.setItem("canteenName", data.canteenName);
        localStorage.setItem("altName", data.altName);
        localStorage.setItem("canteen_id", data.id);
        dispatch({ type: "LOGIN_SUCCESS" });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    dispatch({ type: "LOGIN_SUCCESS" });
    history.push("/");
  }
}

function signOut(dispatch, history) {
  localStorage.clear()
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/auth/");
}
