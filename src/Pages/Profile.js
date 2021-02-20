import React from "react";
import { GoogleLogout } from 'react-google-login';
import { useUserDispatch, signOut } from '../Context/UserContext';
import {TextField,Button,Typography} from '@material-ui/core';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const Profile = (props) => {
  var userDispatch = useUserDispatch();

  const VerifyEmail =()=>{
    //console.log('Verify button is clicked')
    alert("Verify Button is clicked")
  }

  const ChangePassword =()=>{
    //console.log('Verify button is clicked')
    alert("Password will be changed soon")
  }

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "25px 0px",
      }}>
        <div>
          <img alt="userphoto" style={{ width: "160px", height: "160px", borderRadius: "150Px" }}
            src={props.Link} />
          <h3 style={{
            paddingLeft: "0px",
            paddingTop: "20px",

          }}>{props.NickName}
          </h3>
        </div>

        <div>
          <h4 style={HeadingStyle}>
            Username:
            <TextField id="outlined-basic" label="Outlined" variant="outlined" defaultValue={props.Name} />
          </h4>

          <Typography variant="body2">
            {`Email: ${props.Email}`}
          </Typography>
          <Button variant="contained" color="secondary" onClick={VerifyEmail} >
              Verify Email
          </Button>
          
          <br></br>
          <br></br>
          <Button variant="contained" color="secondary" onClick={VerifyEmail} >
          Change Password
          </Button>
          
          <br></br>
          <br></br>

          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={() => {
              signOut(userDispatch, props.history);
            }}
            onFailure={console.log}
          />

        </div>
      </div>

    </div>
  )

}
Profile.defaultProps = {
  Link:'https://i.pinimg.com/236x/e6/42/25/e64225b3924abdb1049429f7d2d68bf0.jpg',
  Name: 'Virat Kohli',
  Email: 'VK_18@gmail.com',
  NickName: 'chikuu',

}
const HeadingStyle = {
  paddingRight: "50px",
  paddingBottom: "20px",
}

export default Profile

