import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "./Layouts/User.js";
import OwnerLayout from "./Layouts/Owner.js";
import AuthLayout from "./Layouts/Auth.js";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import {useUserState} from './Context/UserContext';

export default function App() {

  var {isAuthenticated,role}  = useUserState();

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#deebfb",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#0e041c',
      },
    },
    typography:{
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/"/>
          <PublicRoute path="/auth" component={AuthLayout} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
    
  );


  function PrivateRoute({...rest}) {
    return (
      <Route
        {...rest}
        render={props =>
          {
            if(isAuthenticated && role==='ROLE_OWNER')
            {
              return(React.createElement(OwnerLayout, props))
            }
            else if (isAuthenticated)
            {
              return(React.createElement(UserLayout, props))
            }
            else
            {
              return(<AuthLayout {...props} />)  
            }
          }
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

