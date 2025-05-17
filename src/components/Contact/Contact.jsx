import React from "react";
import s from "./Contact.module.css";

const Contact = ({ contact: { name, number, id }, openModal }) => {
    return (
        <>
            <div className={s.inner}>
                <h3>{name}</h3>
                <a href={`tel:${number}`}>{number}</a>
            </div>
            <div className={s.buttonsWrapper}>
                <button className={s.button} type="button" onClick={() => openModal(id, "edit", name, number)}>
                    Edit
                </button>
                <button className={s.button} type="button" onClick={() => openModal(id, "delete")}>
                    Delete
                </button>
            </div>
        </>
    );
};

export default Contact;