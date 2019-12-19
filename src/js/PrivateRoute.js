import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./store/appContext";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, access, ...rest }) {
	return <Route {...rest} render={props => (access ? <Component {...props} /> : <Redirect to="/" />)} />;
}

PrivateRoute.propTypes = {
	access: PropTypes.access,
	component: PropTypes.Component
};
export default PrivateRoute;
