import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const { userId, product } = action.payload;
            if (!state[userId]) state[userId] = [];
            const exist = state[userId].find((x) => x.id === product.id);
            if (exist) {
                state[userId] = state[userId].map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                state[userId].push({ ...product, qty: 1 });
            }
        },
        delCart: (state, action) => {
            const { userId, product } = action.payload;
            const exist = state[userId].find((x) => x.id === product.id);
            if (exist.qty === 1) {
                state[userId] = state[userId].filter((x) => x.id !== exist.id);
            } else {
                state[userId] = state[userId].map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }
        },
        clearCart: (state, action) => {
            const { userId } = action.payload;
            state[userId] = [];
        }
    },
});

// Define a selector to fetch cart items for a specific user
const selectCartItems = createSelector(
    (state, userId) => state.cart[userId] || [],
    (cartItems) => cartItems
);

export const { addCart, delCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export { selectCartItems }; // Export selector for use in components
