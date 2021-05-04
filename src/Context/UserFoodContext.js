import React, { useEffect } from "react";

var UserFoodStateContext = React.createContext();
var UserFoodDispatchContext = React.createContext();

const initialState = {
  foodItems: [],
  canteens: [],
  cartItems: [],
  mycurrentorders:[],
  carttotal: 0,
  cartamount: 0,
};

function ownerReducer(state, action) {
  switch (action.type) {
    case "SET_ALL_FOOD": {
      return { ...state, foodItems: action.payload };
    }

    case "SET_ALL_CANTEENS": {
      return { ...state, canteens: action.payload };
    }

    case "SET_ALL_CARTITEMS": {
      return { ...state, cartItems: action.payload };
    }

    case "SET_ALL_CURRENT_ORDERS": {
      return { ...state, mycurrentorders: action.payload };
    }

    case "UPDATE_CURRENT_ORDERS": {
      return { ...state, mycurrentorders: [...state.mycurrentorders, ...action.payload] };
    }

    case "ADD_CART_ITEM": {
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    }

    case "REMOVE_CART_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
    }

    case "INCREASE_CARTITEM": {
      let tempCart = state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      return { ...state, cartItems: tempCart };
    }

    case "DECREASE_CARTITEM": {
      let tempCart = state.cartItems
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity !== 0);
      return { ...state, cartItems: tempCart };
    }

    case "CLEAR_CART": {
      return { ...state, cartItems: [] };
    }

    case "GET_CART_TOTALS": {
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { cartfooditem, quantity } = cartItem;
          const itemTotal = cartfooditem.basePrise * quantity;

          cartTotal.total += itemTotal;
          cartTotal.amount += quantity;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));

      return { ...state, carttotal: total, cartamount: amount };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserFoodProvider({ children }) {
  var [state, dispatch] = React.useReducer(ownerReducer, initialState);

  const SetAllFoodItems = (foodlist) => {
    dispatch({ type: "SET_ALL_FOOD", payload: foodlist });
  };

  const SetAllCanteens = (canteenlist) => {
    dispatch({ type: "SET_ALL_CANTEENS", payload: canteenlist });
  };

  const SetAllCartItems = (cartlist) => {
    dispatch({ type: "SET_ALL_CARTITEMS", payload: cartlist });
  };

  const SetAllCurrentOrders = (orderlist) => {
    dispatch({ type: "SET_ALL_CURRENT_ORDERS", payload: orderlist });
  };

  const UpdateCurrentOrders = (orderlist) => {
    dispatch({ type: "UPDATE_CURRENT_ORDERS", payload: orderlist });
  };

  const AddItemToCart = (fooditem) => {
    dispatch({ type: "ADD_CART_ITEM", payload: fooditem });
  };

  const RemoveCartItem = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  const IncreaseCartItem = (id) => {
    dispatch({ type: "INCREASE_CARTITEM", payload: id });
  };

  const DecreaseCartItem = (id) => {
    dispatch({ type: "DECREASE_CARTITEM", payload: id });
  };

  const ClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({ type: "GET_CART_TOTALS" });
  }, [state.cartItems]);

  return (
    <UserFoodStateContext.Provider
      value={{
        ...state,
        SetAllFoodItems,
        SetAllCanteens,
        SetAllCartItems,
        AddItemToCart,
        RemoveCartItem,
        IncreaseCartItem,
        DecreaseCartItem,
        ClearCart,
        SetAllCurrentOrders,
        UpdateCurrentOrders
      }}
    >
      <UserFoodDispatchContext.Provider value={dispatch}>
        {children}
      </UserFoodDispatchContext.Provider>
    </UserFoodStateContext.Provider>
  );
}

function useUserFoodState() {
  var context = React.useContext(UserFoodStateContext);
  if (context === undefined) {
    throw new Error("useUserFoodState must be used within a UserFoodProvider");
  }
  return context;
}

function useUserFoodDispatch() {
  var context = React.useContext(UserFoodDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useUserFoodDispatch must be used within a UserFoodProvider"
    );
  }
  return context;
}

export { UserFoodProvider, useUserFoodState, useUserFoodDispatch };
