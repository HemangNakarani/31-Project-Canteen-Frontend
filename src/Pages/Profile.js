import React from "react";
import { GoogleLogout } from 'react-google-login';
import {useUserDispatch,signOut} from '../Context/UserContext';
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

function Profile(props)
{
    var userDispatch = useUserDispatch();

    return <>
       <GoogleLogout
           clientId={GOOGLE_CLIENT_ID}
           buttonText="Logout"
           onLogoutSuccess={() => {
             signOut(userDispatch, props.history);
           }}
           onFailure={console.log}
        />         
    </>
}

export default Profile;