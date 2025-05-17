import { createSelector } from "@reduxjs/toolkit";
import { selectFiltersQuery } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectFilteredContacts = createSelector(
    [selectContacts, selectFiltersQuery],
    (contacts, filterValue) => {
        if (filterValue !== "") {
            return contacts.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    contact.number.includes(filterValue)
            );
        }
        return contacts;
    }
);