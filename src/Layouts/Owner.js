import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes.js";
import { OwnerProvider } from "../Context/OwnerContext";

function Owner() {
  const getRoutes = (routes) => {
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
        <OwnerProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/owner/dashboard" />
            </Switch>
          </Suspense>
        </OwnerProvider>
      </div>
    </>
  );
}

export default Owner;
