// src/redux/selectors.ts
import { RootState } from "./store";

export const selectFilteredContacts = (state: RootState) => {
  const query = state.contacts.searchQuery.toLowerCase();
  return state.contacts.contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query)
  );
};

export const selectSelectedIds = (state: RootState) =>
  state.contacts.selectedIds;
