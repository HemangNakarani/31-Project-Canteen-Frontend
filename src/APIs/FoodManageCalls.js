import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const getFoodItemsOfMyCanteen = () => {
  console.log("getFoodItemsOfMyCanteen");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/manage/food/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addNewFoodItemToMenu = (obj) => {
  console.log("addNewFoodItemToMenu");

  const token = localStorage.getItem("token", "");

  return axios.post(`${SERVER_URI}/api/manage/food/`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateFoodItemToMenu = (obj) => {
  console.log("updateFoodItemToMenu");

  const token = localStorage.getItem("token", "");

  return axios.put(`${SERVER_URI}/api/manage/food/`, obj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const setFoodItemAvailibility = (id, available) => {
  console.log("setFoodItemAvailibility");
  const token = localStorage.getItem("token", "");
  return axios.put(
    `${SERVER_URI}/api/manage/food/set-availibility?id=${id}&available=${available}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getFoodItemsOfMyCanteen, addNewFoodItemToMenu, updateFoodItemToMenu,setFoodItemAvailibility };
