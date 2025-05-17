import React from "react";
import Navigation from "../Navigation";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import s from "./AppBar.module.css";

const AppBar = () => {
    const isLogged = useSelector(selectIsLoggedIn);

    return (
        <nav className={`${s.nav} container`}>
            <ul className={s.list}>
                <li className={s.wrapper_home}>
                    <Navigation />
                </li>
                <li className={s.wrapper_menu}>
                    {isLogged ? <UserMenu /> : <AuthNav />}
                </li>
            </ul>
        </nav>
    );
};

export default AppBar;