import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const getAllCartItems = () => {
  console.log("getAllCartItems");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addItemToCart = (fooditem_id, quantity) => {
  console.log("addItemToCart");

  const token = localStorage.getItem("token", "");

  return axios.post(
    `${SERVER_URI}/api/cart/`,
    { fooditem_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteCartItem = (fooditem_id) => {
  console.log("deleteCartItem");

  const token = localStorage.getItem("token", "");

  return axios.delete(`${SERVER_URI}/api/cart/${fooditem_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const increaseCartItemApi = (fooditem_id) => {
  console.log("increaseCartItemApi");

  const token = localStorage.getItem("token", "");

  return axios.put(
    `${SERVER_URI}/api/cart/${fooditem_id}/inc`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const decreaseCartItemApi = (fooditem_id) => {
  console.log("decreaseCartItemApi");

  const token = localStorage.getItem("token", "");

  return axios.put(
    `${SERVER_URI}/api/cart/${fooditem_id}/dec`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const checkOutTheCart = (uuid) => {
  console.log("checkOutTheCart");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/cart/checkout/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const myCurrentOrders = () => {
    console.log("myCurrentOrders");
  
    const token = localStorage.getItem("token", "");
  
    return axios.get(`${SERVER_URI}/api/cart/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export {
  getAllCartItems,
  addItemToCart,
  deleteCartItem,
  increaseCartItemApi,
  decreaseCartItemApi,
  checkOutTheCart,
  myCurrentOrders
};
