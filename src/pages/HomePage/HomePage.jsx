import React from "react";
import s from "./HomePage.module.css";

const HomePage = () => {
    return (
        <section className={`${s.home} container`}>
            <h1 className={s.title}>Welcome to the Contacts App</h1>
            <p className={s.text}>Please register or log in to continue</p>
        </section>
    );
};

export default HomePage;
