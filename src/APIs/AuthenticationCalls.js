import axios from "axios";

const SERVER_URI = process.env.REACT_APP_SERVER_URI || "";

const SignUp = (username,email,password)=>{

    return axios.post(`${SERVER_URI}/api/auth/signup`,{username,email,password, "role":["user"]})

}

const LogIn = (username,password)=>{

    return axios.post(`${SERVER_URI}/api/auth/signin`,{username,password})

}

const ForgotPassword = (emailID)=>{

    return axios.post(`${SERVER_URI}/api/auth/forget-password?email=${emailID}`,{})

}
export {SignUp,LogIn,ForgotPassword};