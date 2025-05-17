import React, { Component } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
