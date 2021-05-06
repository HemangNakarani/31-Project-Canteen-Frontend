import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const SignUp = (username, email, password) => {
  return axios.post(`${SERVER_URI}/api/auth/signup`, {
    username,
    email,
    password,
    role: ["user"],
  });
};

const LogIn = (username, password) => {
  return axios.post(`${SERVER_URI}/api/auth/signin`, { username, password });
};

const ForgotPassword = (emailID) => {
  return axios.post(
    `${SERVER_URI}/api/auth/forget-password?email=${emailID}`,
    {}
  );
};

const getCanteenDetails = () => {
  console.log("getCanteenDetails");

  const token = localStorage.getItem("token", "");

  return axios.get(`${SERVER_URI}/api/auth/canteen-details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const changeDp = (dp_url) => {

  console.log("changeDp");

  const token = localStorage.getItem("token", "");

  return axios.post(`${SERVER_URI}/api/auth/update-dp?dp_url=${dp_url}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { SignUp, LogIn, ForgotPassword, getCanteenDetails,changeDp };
