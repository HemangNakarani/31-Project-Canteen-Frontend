import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const getOrderByStatus = (status) => {
  console.log("getOrderByStatus-[Owner]");

  const token = localStorage.getItem("token", "");

  return axios.get(
    `${SERVER_URI}/api/manage/food/orders-by-status?status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const setOrderStatus = (id, status) => {
  console.log("setOrderStatus-[Owner]");

  const token = localStorage.getItem("token", "");

  return axios.put(
    `${SERVER_URI}/api/manage/food/update-order?id=${id}&status=${status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getOrderByStatus, setOrderStatus };
