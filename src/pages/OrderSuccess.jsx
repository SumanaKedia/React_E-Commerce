
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assuming you have a Navbar component
import Footer from '../components/Footer'; // Assuming you have a Footer component

const OrderSuccess = () => {
    return (
        <div>
            <Navbar /> {/* Include the navbar component */}
            <div className="container my-5 py-5 text-center">
                <h1 className="display-4">Order Placed Successfully!</h1>
                <p className="lead">Thank you for your purchase. Your order has been placed successfully.</p>
                <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
            </div>
            <Footer /> {/* Include the footer component */}
        </div>
    );
};

export default OrderSuccess;
