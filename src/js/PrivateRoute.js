import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./store/appContext";

function PrivateRoute({ component: Component, access, ...rest }) {
	return <Route {...rest} render={props => (access ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export default PrivateRoute;
