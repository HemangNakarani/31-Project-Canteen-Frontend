import React, { useContext, useReducer, useEffect } from "react";

const SocketContext = React.createContext();

const initialState = {
  connected: false,
};

const reducer = (state, action) => {
  if (action.type === "SET_CONNECTED") {
    return { ...state, connected: !state.connected };
  }
  throw new Error("no matching action type");
};

const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setConnected = () => {
    dispatch({ type: "SET_CONNECTED" });
  };

  useEffect(() => {
    // dispatch({ type: 'GET_TOTALS' })
  }, []);

  return (
    <SocketContext.Provider
      value={{
        ...state,
        setConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => {
  return useContext(SocketContext);
};

export { useSocketContext, SocketContext, SocketContextProvider };
