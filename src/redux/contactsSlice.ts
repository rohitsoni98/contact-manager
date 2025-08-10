// src/redux/contactsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  name: string;
  state: string;
  email: string;
  number: string;
  address: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
}

interface ContactsState {
  contacts: Contact[];
  searchQuery: string;
  selectedIds: string[];
}

const loadContactsFromLocalStorage = (): Contact[] => {
  try {
    const data = localStorage.getItem("contacts");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    alert("Failed to load contacts from localStorage");
    return [];
  }
};

const saveContactsToLocalStorage = (contacts: Contact[]) => {
  try {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } catch (error) {
    alert("Failed to save contacts to localStorage");
  }
};

const initialState: ContactsState = {
  searchQuery: "",
  selectedIds: [],
  contacts: loadContactsFromLocalStorage(),
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      saveContactsToLocalStorage(state.contacts);
    }, // done

    editContact: (state, action: PayloadAction<Contact>) => {
      const updatedContact = action.payload;
      const index = state.contacts.findIndex((c) => c.id === updatedContact.id);
      if (index !== -1) {
        state.contacts[index] = updatedContact;
        saveContactsToLocalStorage(state.contacts);
      }
    }, // done

    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      saveContactsToLocalStorage(state.contacts);
    }, // done

    bulkDeleteContacts: (state) => {
      state.contacts = state.contacts.filter(
        (c) => !state.selectedIds.includes(c.id)
      );
      state.selectedIds = [];
      saveContactsToLocalStorage(state.contacts);
    }, // done

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }, // done

    toggleSelectContact: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((i) => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    }, // done

    toggleSelectAllContacts: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectedIds = state.contacts.map((contact) => contact.id);
      } else {
        state.selectedIds = [];
      }
    }, //done

    clearSelectedContacts: (state) => {
      state.selectedIds = [];
    }, // done
  },
});

export const {
  addContact,
  editContact,
  deleteContact,
  bulkDeleteContacts,
  setSearchQuery,
  toggleSelectContact,
  toggleSelectAllContacts,
  clearSelectedContacts,
} = contactsSlice.actions;

export default contactsSlice.reducer;
