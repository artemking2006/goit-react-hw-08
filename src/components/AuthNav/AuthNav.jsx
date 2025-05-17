import React from "react";
import s from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";

const AuthNav = () => {
    return (
        <>
            <NavLink className={s.link} to="/login">
                Login
            </NavLink>
            <NavLink className={s.link} to="/register">
                Register
            </NavLink>
        </>
    );
};

export default AuthNav;