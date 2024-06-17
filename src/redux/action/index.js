// For Add Item to Cart
export const addCart = (product) => {
    return {
        type: "ADDITEM",
        payload: product
    }
}

// For Delete Item to Cart
export const delCart = (product) => {
    return {
        type: "DELITEM",
        payload: product
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
}

export const addWishlistItem = (userEmail, product) => {
    if (!userEmail || !product) {
        console.error("userEmail or product is missing in action creator");
        return {
            type: 'INVALID_ACTION' // Return an invalid action to avoid reducer issues
        };
    }
    return {
        type: 'ADD_WISHLIST_ITEM',
        payload: { userEmail, product }
    };
}

export const removeWishlistItem = (userEmail, product) => {
    if (!userEmail || !product) {
        console.error("userEmail or product is missing in action creator");
        return {
            type: 'INVALID_ACTION' // Return an invalid action to avoid reducer issues
        };
    }
    return {
        type: 'REMOVE_WISHLIST_ITEM',
        payload: { userEmail, product }
    };
}

export const clearWishlist = (userEmail) => {
    return {
        type: "CLEAR_WISHLIST",
        payload: { userEmail }
    }
}
