// import React from 'react';
// import { Footer, Navbar } from "../components";
// import { useAuth } from '../pages/AuthContext';
// import { Link } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import { addCart, removeWishlistItem } from "../redux/action";


// const Wishlist = () => {
//     const { email } = useAuth(); // Get the current userAtributes
//     const stateOfwish = useSelector(state => state.wishlist);
//     const userWishlist = stateOfwish.wishlists[email] || [];
//     const dispatch = useDispatch();

//     const handleAddToCart = (item) => {
//         dispatch(addCart(item));
//         dispatch(removeWishlistItem(email, item));
//     };

//     const handleRemoveFromWishlist = (item) => {
//         dispatch(removeWishlistItem(email, item));
//     };


//     const EmptyWishlist = () => {
//         return (
//             <div className="container">
//                 <div className="row justify-content-center mt-5">
//                     <div className="col-md-8 text-center">
//                         <h4>Your Wishlist is Empty</h4>
//                         <Link to="/" className="btn btn-outline-dark mt-3">
//                             <i className="fa fa-arrow-left"></i> Continue Shopping
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     };


//     const ShowWishlist = () => {
//         return (
//             <div className="container mt-5">
//                 <div className="row">
//                     {userWishlist.map((item, index) => (
//                         <div className="col-md-12 mb-4 d-flex justify-content-between align-items-center" key={item.id}>
//                             <div className="card h-100 flex-grow-1 me-2">
//                                 <div className="row g-0">
//                                     <div className="col-md-4">
//                                         <img
//                                             src={item.image}
//                                             className="img-fluid rounded-start"
//                                             alt={item.title}
//                                             width={100} // Fixed size for the image
//                                             height={75} // Fixed size for the image
//                                         />
//                                     </div>
//                                     <div className="col-md-8">
//                                         <div className="card-body">
//                                             <h5 className="card-title">{item.title}</h5>
//                                             <p className="card-text">Product ID: {item.id}</p>
//                                             <div className="d-flex justify-content-start">
//                                                 <button
//                                                     className="btn btn-success mb-2 me-2"
//                                                     onClick={() => handleAddToCart(item)}
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-danger mb-2"
//                                                     onClick={() => handleRemoveFromWishlist(item)}
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>


//                     ))}
//                 </div>
//             </div >
//         );
//     };





//     return (
//         <>
//             <Navbar />
//             <div className="wishlist-page">
//                 <div className="container my-3 py-3">
//                     <h1 className="text-center">Wishlist</h1>
//                     <hr />
//                     {userWishlist.length > 0 ? <ShowWishlist /> : <EmptyWishlist />}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Wishlist;






import React from 'react';
import { Footer, Navbar } from "../components";
import { useAuth } from '../pages/AuthContext';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeWishlistItem } from "../redux/action";

const Wishlist = () => {
    const { email } = useAuth(); // Get the current user's email
    const stateOfwish = useSelector(state => state.wishlist);
    const userWishlist = stateOfwish.wishlists[email] || [];
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addCart(item));
        dispatch(removeWishlistItem(email, item));
    };

    const handleRemoveFromWishlist = (item) => {
        dispatch(removeWishlistItem(email, item));
    };

    const EmptyWishlist = () => (
        <div className="container text-center mt-5">
            <h4>Your Wishlist is Empty</h4>
            <Link to="/" className="btn btn-outline-dark mt-3">
                <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
        </div>
    );

    const ShowWishlist = () => (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {userWishlist.map((item) => (
                    <div className="col" key={item.id}>
                        <div className="card h-100">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="img-thumbnail mx-auto d-block mt-2 mb-2"
                                style={{ width: '200px', height: '200px' }}
                            />

                            <div className="card-body text-center">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Product Price: <strong>${item.price}</strong></p>
                                <div className="d-flex justify-content-around">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveFromWishlist(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="wishlist-page">
                <div className="container my-3 py-3">
                    <h1 className="text-center">Wishlist</h1>
                    <hr />
                    {userWishlist.length > 0 ? <ShowWishlist /> : <EmptyWishlist />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;

