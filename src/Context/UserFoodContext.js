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
  foodItemsupdated:false,
  canteensupdated:false,
  cartItemsupdated:false,
  mycurrentordersupdated:false,
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

    case "UPDATE_CURRENT_ORDER_ITEM": {

      let tempOrders = state.mycurrentorders.map((currentorder) => {
        if (currentorder.id === action.payload.id) {
          return { ...currentorder, undatedAt: action.payload["undatedAt"], status: action.payload["status"] };
        }
        return currentorder;
      });
      return { ...state, mycurrentorders: tempOrders };

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

    case "SET_FOODITEMS_UPDATED": {
      return { ...state, foodItemsupdated: true };
    }

    case "SET_CANTEENS_UPDATED": {
      return { ...state, canteensupdated: true };
    }

    case "SET_CARTITEMS_UPDATED": {
      return { ...state, cartItemsupdated: true };
    }

    case "SET_MYCURRENTORDERS_UPDATED": {
      return { ...state, mycurrentordersupdated: true };
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

  const updateCurrentOrderItem = (order) => {
    dispatch({ type: "UPDATE_CURRENT_ORDER_ITEM", payload: order });
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

  const setFoodItemsUpdated = ()=>{
    dispatch({ type: "SET_FOODITEMS_UPDATED" });
  }

  const setCanteensUpdated = ()=>{
    dispatch({ type: "SET_CANTEENS_UPDATED" });
  }

  const setCartItemsUpdated = ()=>{
    dispatch({ type: "SET_CARTITEMS_UPDATED" });
  }

  const setMyCurrentOrdersUpdated = ()=>{
    dispatch({ type: "SET_MYCURRENTORDERS_UPDATED" });
  }

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
        UpdateCurrentOrders,
        setFoodItemsUpdated,
        setCartItemsUpdated,
        setCanteensUpdated,
        setMyCurrentOrdersUpdated,
        updateCurrentOrderItem
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
