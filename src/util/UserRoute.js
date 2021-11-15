import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { AuthContext } from "../context/auth";
import PageNotFound from "../pages/PageNotFound";

function userRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Route component={PageNotFound} />
      }
    />
  );
}
export default userRoute;
