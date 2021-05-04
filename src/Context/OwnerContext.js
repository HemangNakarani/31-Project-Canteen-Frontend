import React from "react";

var OwnerStateContext = React.createContext();
var OwnerDispatchContext = React.createContext();

const initialState = {
  foodItems: [],
  pendingorders: [],
  cookingorders:[],
  completedorders:[]
};

function ownerReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FOODITEM": {
      var dumList = state.foodItems;
      dumList[action.payload.index] = action.payload.item;

      return { ...state, foodItems: dumList };
    }

    case "ADD_FOODITEM": {
      return { ...state, foodItems: [...state.foodItems, action.payload] };
    }

    case "SET_PENDING_ORDERS": {
      return { ...state, pendingorders: action.payload };
    }

    case "ADD_PENDING_ORDER": {
      return { ...state, pendingorders: [...state.pendingorders, action.payload] };
    }

    case "SET_COOKING_ORDERS": {
      return { ...state, cookingorders: action.payload };
    }

    case "SET_COMPLETED_ORDERS": {
      return { ...state, completedorders: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function OwnerProvider({ children }) {
  var [state, dispatch] = React.useReducer(ownerReducer, initialState);

  const UpdateFoodItem = (index, item) => {
    dispatch({ type: "UPDATE_FOODITEM", payload: { index, item } });
  };

  const AddFoodItem = (item) => {
    dispatch({ type: "ADD_FOODITEM", payload: item });
  };

  const setPendingOrders = (orderslist) => {
    dispatch({ type: "SET_PENDING_ORDERS", payload: orderslist });
  };

  const setCookingOrders = (orderslist) => {
    dispatch({ type: "SET_COOKING_ORDERS", payload: orderslist });
  };

  const setCompletedOrders = (orderslist) => {
    dispatch({ type: "SET_COMPLETED_ORDERS", payload: orderslist });
  };

  const addOrderToPendingList = (orderitem) => {
    dispatch({ type: "ADD_PENDING_ORDER", payload: orderitem });
  };

  return (
    <OwnerStateContext.Provider
      value={{
        ...state,
        UpdateFoodItem,
        AddFoodItem,
        setPendingOrders,
        addOrderToPendingList,
        setCookingOrders,
        setCompletedOrders
      }}
    >
      <OwnerDispatchContext.Provider value={dispatch}>
        {children}
      </OwnerDispatchContext.Provider>
    </OwnerStateContext.Provider>
  );
}

function useOwnerState() {
  var context = React.useContext(OwnerStateContext);
  if (context === undefined) {
    throw new Error("useOwnerState must be used within a OwnerProvider");
  }
  return context;
}

function useOwnerDispatch() {
  var context = React.useContext(OwnerDispatchContext);
  if (context === undefined) {
    throw new Error("useOwnerDispatch must be used within a OwnerProvider");
  }
  return context;
}

export { OwnerProvider, useOwnerState, useOwnerDispatch };
