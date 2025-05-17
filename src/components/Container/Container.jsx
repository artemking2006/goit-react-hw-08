import React from "react";
import s from "./Container.module.css";

const Container = ({ children, wrapper }) => {
    return <div className={s[wrapper]}>{children}</div>;
};

export default Container;