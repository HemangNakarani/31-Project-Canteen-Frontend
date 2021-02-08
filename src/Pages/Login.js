import React,{useEffect} from "react";
import GoogleLogin from 'react-google-login';
import {useUserDispatch, loginUser } from '../Context/UserContext';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

function Login(props)
{
    var userDispatch = useUserDispatch();

    useEffect(()=>{
        
    })

    return <>
        <GoogleLogin
           clientId={GOOGLE_CLIENT_ID}
           buttonText="Sign In with Google"
           onSuccess={(response) => {
             loginUser(userDispatch, props.history, response);
           }}
           onFailure={console.log}       
        />
    </>
}

export default Login;