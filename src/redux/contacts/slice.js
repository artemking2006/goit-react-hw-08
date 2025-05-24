import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContacts,
    addContact,
    deleteContact,
    editContact,
} from "./operations";
import { logout } from "../auth/operations";

const handlePending = (state) => {
    state.loading = true;
}

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items = action.payload;
            })
        
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.rejected, handleRejected)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.items.push(action.payload);
            })
        
            
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.rejected, handleRejected)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (contact) => contact.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(logout.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
                state.error = null;
            })
            .addCase(editContact.pending, handlePending)
            .addCase(editContact.rejected, handleRejected)
            .addCase(editContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.items.findIndex(
                    (contact) => contact.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default slice.reducer;