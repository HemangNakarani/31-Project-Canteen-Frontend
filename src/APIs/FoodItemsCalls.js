import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const getAllCanteens = () => {

  console.log("getAllCanteens");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/food/canteens`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllFoodItems = () => {

  console.log("getAllFoodItems");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/food/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllFoodItemsFromCanteen = (id) => {

  console.log("getAllFoodItemsFromCanteen");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/food/fromcanteen/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllCanteens, getAllFoodItems, getAllFoodItemsFromCanteen };
