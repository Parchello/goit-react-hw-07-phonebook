import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from './servise';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const onPending = state => {
  state.isLoading = true;
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const arrOfActions = [fetchContacts, addContact, deleteContact];

const addStatusToActions = status => arrOfActions.map(el => el[status]);

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== payload.id);
      })
      .addMatcher(isAnyOf(...addStatusToActions('pending')), onPending)
      .addMatcher(isAnyOf(...addStatusToActions('rejected')), onRejected);
  },
});

const { reducer: contactsReducer } = contactSlice;
export default contactsReducer;
