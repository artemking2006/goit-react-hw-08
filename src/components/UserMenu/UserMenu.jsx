import React from "react";
import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const UserMenu = () => {
    const dispatch = useDispatch();
    const userName = useSelector(selectName);
    const handleLogOut = () => {
        dispatch(logout());
    };

    return (
        <>
            <p className={s.userName}>Hello, {userName}</p>
            <button onClick={handleLogOut} className={s.button}>
                Log out
            </button>
        </>
    );
};

export default UserMenu;