import React, { useEffect } from "react";
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useUserDispatch, loginUser } from '../Context/UserContext';
import "./Login.css";

// const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_ID = "638324418102-ph6j8qqubi8tpl1l8drhfb9mqrrrvd8k.apps.googleusercontent.com";

function SignupPage(props) {
    var userDispatch = useUserDispatch();

    useEffect(() => {

    })
    const history = useHistory();



    return <>

        <div class="container">
            <div class="forms-container">
                <div class="signin-signup">
                    <form action="#" class="sign-in-form">
                        <h2 class="register-title">Sign up</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Firstname" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Lastname" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="email" placeholder="Email" />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                        </div>

                        <input type="submit" value="Sign up" class="btn solid" />
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



                    </form>
                </div>
            </div>

            <div class="panels-container">

                <div class="panel left-panel">

                    <div class="content">
                        <h2>Welcome to <span style={{ color: 'red' }}>M</span>cDA's!</h2>


                        <p>If you have already account,then just Login </p>

                        <button class="btn transparent" onClick={() => {
                            history.push('/auth/login');


                        }} id="sign-up-btn" >
                            Login
            </button>
                    </div>

                </div>
                
            </div>
        </div>


    </>
}

export default SignupPage;