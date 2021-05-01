import React from "react";

var OwnerStateContext = React.createContext();
var OwnerDispatchContext = React.createContext();

const initialState = {
  foodItems: [
    {
      id: 1,
      name: "Masala Chai",
      description: "Garam Garam in Winter",
      basePrise: 15,
      available: true,
      image_url:
        "https://img.etimg.com/photo/msid-69212931,quality-100/chai-itself-was-once-a-trend-that-developed-this-way-.jpg",
      stars: 0,
      number_of_rating: 0,
      canteen_id: 1,
    },
    {
      id: 2,
      name: "Dabeli",
      description: "Wahh Betey Mozz krdi",
      basePrise: 30,
      available: false,
      image_url:
        "https://yummytummyrecipes.com/wp-content/uploads/2021/02/Image-of-Dabeli-min-scaled.jpg",
      stars: 0,
      number_of_rating: 0,
      canteen_id: 1,
    },
    {
      id: 3,
      name: "Double Masala Chai",
      description: "Double Garam Garam",
      basePrise: 20,
      available: false,
      image_url:
        "https://img.etimg.com/photo/msid-69212931,quality-100/chai-itself-was-once-a-trend-that-developed-this-way-.jpg",
      stars: 0,
      number_of_rating: 0,
      canteen_id: 1,
    },
    {
      id: 4,
      name: "DA's Burger",
      description: "Tam to bde heavy driver ho bhai",
      basePrise: 60,
      available: true,
      image_url:
        "https://yummytummyrecipes.com/wp-content/uploads/2021/02/Image-of-Dabeli-min-scaled.jpg",
      stars: 0,
      number_of_rating: 0,
      canteen_id: 1,
    },
  ],
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

  return (
    <OwnerStateContext.Provider
      value={{ ...state, UpdateFoodItem, AddFoodItem }}
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
