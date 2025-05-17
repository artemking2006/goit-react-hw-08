import React, { useState } from "react";
import Contact from "../Contact";
import s from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    selectError,
    selectFilteredContacts,
    selectLoading,
} from "../../redux/contacts/selectors";
import Modal from "react-modal";
import { deleteContact, editContact } from "../../redux/contacts/operations";
import Loader from "../Loader";

const ContactList = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [contactId, setContactId] = useState(null);
    const [type, setType] = useState(null);
    const [contact, setContact] = useState(null);
    const filteredContacts = useSelector(selectFilteredContacts);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const openModal = (id, type, name = "", number = "") => {
        setType(type);
        setIsOpen(true);
        setContactId(id);
        setContact({ name: name, id: id, number: number });
    };


    const closeModal = () => {
        setIsOpen(false);
    };


    const delContact = () => {
        dispatch(deleteContact(contactId));
        setIsOpen(false);
    };

    const handleEditContact = () => {
        dispatch(editContact(contact));
        setIsOpen(false);
    };

    return (
        <>
            {isLoading && !error && <Loader />}
            <ul className={s.list}>
                {filteredContacts.map((contact) => (
                    <li className={s.item} key={contact.id}>
                        <Contact openModal={openModal} contact={contact} />
                    </li>
                ))}
            </ul>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel={type === "edit" ? "Edit contact" : "Delete contact"} className={s.modal} overlayClassName={s.overlay} >
                {type === "edit" ? (
                    <div className={s.editModal}>
                        <h2>Edit Contact</h2>
                        <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Name" className={s.input} />
                        <input type="text" value={contact.number} onChange={(e) => setContact({ ...contact, number: e.target.value })} placeholder="Phone Number" className={s.input} />
                        <div className={s.buttonsWrapper}>
                            <button onClick={handleEditContact} className={`${s.button} ${s.editButton}`}>
                                Confirm
                            </button>
                            <button onClick={closeModal} className={s.button}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={s.deleteModal}>
                        <h2>Are you sure you want to delete this contact?</h2>
                        <div className={s.buttonsWrapper}>
                            <button onClick={delContact} className={`${s.button} ${s.delButton}`}>
                                Yes
                            </button>
                            <button onClick={closeModal} className={s.button}>
                                No
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ContactList;