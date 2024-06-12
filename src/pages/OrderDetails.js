import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const OrderDetails = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;

    if (!orderDetails) {
        return (
            <>
                <Navbar />
                <div className="container my-3 py-3">
                    <h1 className="text-center">Order Details</h1>
                    <hr />
                    <h4 className="text-center">No order details available.</h4>
                </div>
                <Footer />
            </>
        );
    }

    const { items, totalAmount, subtotal, totalItems, userDetails, shippingcost, orderID, orderDate } = orderDetails;

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <div className="mb-3">
                    <Link to="/order-history" className="text-link">
                        <i className="fas fa-arrow-left"></i> Back to Order History
                    </Link>
                </div>
                <h1 className="text-center">Order Details</h1>
                <hr />
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">

                                    <div className="card-header py-3 d-flex justify-content-between">
                                        <p className="mb-0"><span style={{ fontWeight: 600 }}>Order ID:</span> {orderID}</p>
                                        <p className="mb-0"><span style={{ fontWeight: 600 }}>Order date:</span> {new Date(orderDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                    </div>


                                    <div className="card-body">
                                        {items.map((item, index) => (
                                            <div key={index}>
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-lg-3 col-md-12">
                                                        <div className="bg-image rounded" data-mdb-ripple-color="light">
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                width={100}
                                                                height={75}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 col-md-6">
                                                        <p style={{ fontWeight: 400 }}>
                                                            {item.title}
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6">
                                                        <p className="text-start text-md-center">

                                                            <span className="text-muted">{item.qty}</span> x ${item.price}

                                                        </p>
                                                    </div>
                                                </div>
                                                <hr className="my-4" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3 bg-light">
                                        <h5 className="mb-0">Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products ({totalItems})<span>${subtotal}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>${shippingcost}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                </div>
                                                <span>
                                                    <strong>${totalAmount}</strong>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-header py-3 bg-light">
                                        <h5 className="mb-0">Shipping Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                                        <p><strong>Address:</strong> {userDetails.address}, {userDetails.city}, {userDetails.state}, {userDetails.country}, {userDetails.zip}</p>
                                        <p><strong>Email:</strong> {userDetails.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
            <style jsx>{`
                .text-link {
                    font-size: 14px;
                    color: #5a5a5a; /* Example of a theme color */
                    text-decoration: none;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .text-link:hover {
                    background-color: #e2e6ea; /* Light gray background on hover */
                }
            `}</style>
        </>
    );
};

export default OrderDetails;
