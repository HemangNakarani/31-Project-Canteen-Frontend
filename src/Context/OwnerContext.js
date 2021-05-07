import React from "react";

var OwnerStateContext = React.createContext();
var OwnerDispatchContext = React.createContext();

const initialState = {
  foodItems: [],
  pendingorders: [],
  cookingorders: [],
  completedorders: [],
  myfoodItemsupdated:false,
  pendingordersupdated: false,
  cookingordersupdated: false,
  completedordersupdated: false,
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

    case "SET_ALL_MYFOODITEMS": {
      return { ...state, foodItems: action.payload };
    }

    case "SET_PENDING_ORDERS": {
      return { ...state, pendingorders: action.payload };
    }

    case "ADD_PENDING_ORDER": {
      return {
        ...state,
        pendingorders: [...state.pendingorders, action.payload],
      };
    }

    case "SET_COOKING_ORDERS": {
      return { ...state, cookingorders: action.payload };
    }

    case "PENDING_TO_COOKING": {
      let tempOrder;

      let temporderList = state.pendingorders
        .map((order) => {
          if (order.id === action.payload) {
            tempOrder = order;
          }
          return order;
        })
        .filter((porder) => porder.id !== action.payload);

      tempOrder["status"] = "Cooking";

      return {
        ...state,
        pendingorders: temporderList,
        cookingorders: [...state.cookingorders, tempOrder],
      };
    }

    case "SET_COMPLETED_ORDERS": {
      return { ...state, completedorders: action.payload };
    }

    case "COOKING_TO_READY": {
      let tempOrder;
      let temporderList = state.cookingorders
        .map((order) => {
          if (order.id === action.payload) {
            tempOrder = order;
          }
          return order;
        })
        .filter((porder) => porder.id !== action.payload);

      tempOrder["status"] = "Ready";

      return {
        ...state,
        cookingorders: temporderList,
        completedorders: [...state.completedorders, tempOrder],
      };
    }

    case "READY_TO_FULLFILLED": {
      return {
        ...state,
        completedorders: state.completedorders.filter((porder) => porder.id !== action.payload),
      };
    }

    case "REJECTED": {
      return {
        ...state,
        pendingorders: state.pendingorders.filter((porder) => porder.id !== action.payload),
      };
    }

    case "SET_MYFOODITEMS_UPDATED": {
      return { ...state, myfoodItemsupdated: true };
    }

    case "SET_PENDING_ORDER_UPDATED": {
      return { ...state, pendingordersupdated: true };
    }

    case "SET_COOKING_ORDER_UPDATED": {
      return { ...state, cookingordersupdated: true };
    }

    case "SET_COMPLETED_ORDER_UPDATED": {
      return { ...state, completedordersupdated: true };
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

  const setMyFoodItems = (foodlist) => {
    dispatch({ type: "SET_ALL_MYFOODITEMS", payload: foodlist });
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

  const transferPendingtoCooking = (id) => {
    dispatch({ type: "PENDING_TO_COOKING", payload: id });
  };

  const transferCookingToCompleted = (orderitem) => {
    dispatch({ type: "COOKING_TO_READY", payload: orderitem });
  };

  const transferCompletedToFullFilled = (orderitem) => {
    dispatch({ type: "READY_TO_FULLFILLED", payload: orderitem });
  };

  const rejectOrder = (orderitem) => {
    dispatch({ type: "REJECTED", payload: orderitem });
  };

  const setMyFoodItemsUpdated = () => {
    dispatch({ type: "SET_MYFOODITEMS_UPDATED" });
  };

  const setPendingOrdersUpdated = () => {
    dispatch({ type: "SET_PENDING_ORDER_UPDATED" });
  };

  const setCookingOrdersUpdated = () => {
    dispatch({ type: "SET_COOKING_ORDER_UPDATED" });
  };

  const setCompletedOrdersUpdated = () => {
    dispatch({ type: "SET_COMPLETED_ORDER_UPDATED" });
  };

  return (
    <OwnerStateContext.Provider
      value={{
        ...state,
        UpdateFoodItem,
        AddFoodItem,
        setPendingOrders,
        addOrderToPendingList,
        transferPendingtoCooking,
        transferCookingToCompleted,
        transferCompletedToFullFilled,
        setCookingOrders,
        setCompletedOrders,
        setCompletedOrdersUpdated,
        setCookingOrdersUpdated,
        setPendingOrdersUpdated,
        setMyFoodItems,
        setMyFoodItemsUpdated,
        rejectOrder
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
