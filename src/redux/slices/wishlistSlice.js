import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { userId, item } = action.payload;
            if (!state[userId]) state[userId] = [];
            if (!state[userId].find((x) => x.id === item.id)) {
                state[userId].push(item);
            }
        },
        removeItem: (state, action) => {
            const { userId, item } = action.payload;
            state[userId] = state[userId].filter((x) => x.id !== item.id);
        },
        clearWishlist: (state, action) => {
            const { userId } = action.payload;
            state[userId] = [];
        }
    },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
