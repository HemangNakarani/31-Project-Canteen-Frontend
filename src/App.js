import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "./Layouts/User.js";
import AuthLayout from "./Layouts/Auth.js";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import {useUserState} from './Context/UserContext';

export default function App() {

  var {isAuthenticated}  = useUserState();

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#deebfb",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#ffeaf0',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" component={UserLayout} />
          <PublicRoute path="/auth" component={AuthLayout} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    
  );


  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <AuthLayout {...props} />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

}

