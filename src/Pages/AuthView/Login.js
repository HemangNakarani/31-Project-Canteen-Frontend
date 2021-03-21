import React, { useEffect } from "react";
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useUserDispatch, loginUser } from '../../Context/UserContext';
import "./Login.css";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

function Login(props) {
  var userDispatch = useUserDispatch();

  useEffect(() => {

  })

  const history = useHistory();

  return <>

    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="register-title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>

            <input type="submit" value="Login" class="btn solid" onClick={() => {}} />
            <p>Or</p>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={(response) => {
                loginUser(userDispatch, props.history, response);
              }}
              onFailure={console.log}
            />
          </form>

          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" class="btn" value="Sign up" />

            {/* <p class="social-text">Or Sign up with social platforms</p> */}

          </form>
        </div>
      </div>

      <div class="panels-container">

        <div class="panel left-panel">

          <div class="content">
            <h2>Welcome to <span style={{ color: 'red' }}>M</span>cDA's!</h2>
            <h3>Are you New here ?</h3>
            <p>
              You don't have account then sign up in just minutes.
            </p>
            <button class="btn transparent" onClick={() => {history.push('/auth/signup')}} id="sign-up-btn" >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login;