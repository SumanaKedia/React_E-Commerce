const initialState = {
    wishlists: {} // { userEmail: [products] }
};



const handleWishlist = (state = initialState, action) => {
    const { userEmail, product } = action.payload || {};

    // Log the action to debug
    // console.log("Action:", action);
    // console.log("Payload:", action.payload);
    // console.log("Product:", product);
    // console.log("Email:", userEmail);

    // Check if userEmail and product are defined before proceeding
    if (!userEmail || !product) {
        console.error("Invalid action payload: ", action.payload);
        return state; // Return the current state if userEmail or product is undefined
    }
    // Ensure the state structure is correctly initialized
    if (!state.wishlists) {
        state = { ...initialState, wishlists: {} };
    }
    // Handle undefined state case for user email lookup
    const userWishlist = state.wishlists[userEmail] || [];
    switch (action.type) {
        case "ADD_WISHLIST_ITEM":
            return {
                ...state,
                wishlists: {
                    ...state.wishlists,
                    [userEmail]: [...userWishlist, product]
                }
            };
        case "REMOVE_WISHLIST_ITEM":
            return {
                ...state,
                wishlists: {
                    ...state.wishlists,
                    [userEmail]: userWishlist.filter((x) => x.id !== product.id)
                }
            };
        case "CLEAR_WISHLIST":
            return {
                ...state,
                wishlists: {
                    ...state.wishlists,
                    [userEmail]: []
                }
            };
        default:
            return state;
    }
}

export default handleWishlist;
