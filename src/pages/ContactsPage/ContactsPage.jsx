import React, { useEffect } from "react";
import s from "./ContactsPage.module.css";
import ContactForm from "../../components/ContactForm";
import SearchBox from "../../components/SearchBox";
import ContactList from "../../components/ContactList";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";

const ContactsPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <section className={`{s.main} container`}>
            <ul className={s.list}>
                <li className={s.itemSide}>
                    <ContactForm />
                    <SearchBox />
                </li>
                <li className={s.itemCenter}>
                    <ContactList />
                </li>
            </ul>
        </section>
    );
};

export default ContactsPage;