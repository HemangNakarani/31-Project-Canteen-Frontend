import React,{Suspense} from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes.js";

function Owner(){
  
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/owner") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
    return (
      <>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="*" to="/owner/dashboard" />
                </Switch>
          </Suspense>
        </div>
      </>
    );
  }

export default Owner;
