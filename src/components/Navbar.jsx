import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../pages/AuthContext';

const Navbar = () => {

    const cartState = useSelector(state => state.handleCart);
    const { authenticated, logout, name, email } = useAuth();
    const stateOfwish = useSelector(state => state.wishlist);
    const userWishlist = (stateOfwish.wishlists && stateOfwish.wishlists[email]) || [];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Quick Shop</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {authenticated ? (
                            <>
                                <span className="navbar-text mx-2">Hello, {name}</span>
                                <NavLink to="/order-history" className="btn btn-outline-dark btn-sm m-2">
                                    <i className="fa fa-history mr-1"></i> Order History
                                </NavLink>

                                <NavLink to="/wishlist" className="btn btn-outline-dark btn-sm m-2">
                                    <i className="fa fa-heart mr-1"></i> Wishlist ({userWishlist.length})
                                </NavLink>
                                <button className="btn btn-outline-dark btn-sm m-2" onClick={logout}>
                                    <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                </button>

                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark btn-sm m-2">
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark btn-sm m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>


                            </>
                        )}
                        {/* <NavLink to="/cart" className="btn btn-outline-dark btn-sm m-2">
                            <i className="fa fa-shopping-cart mr-1"></i> Cart ({cartState.length})
                        </NavLink> */}
                        <NavLink to="/cart" className="btn btn-outline-dark btn-sm m-2">
                            <i className="fa fa-shopping-cart mr-1"></i>
                            Cart ({authenticated ? cartState.length : 0})
                        </NavLink>

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
