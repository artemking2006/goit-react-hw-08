import React from "react";
import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectName);

  const handleLogOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login"); // После logout — редиректим
    } catch (error) {
      console.error("Logout failed:", error);
    }
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