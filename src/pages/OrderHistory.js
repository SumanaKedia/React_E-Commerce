
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from './AuthContext';
import awsConfig from '../awsConfig';
import { Link } from 'react-router-dom';
import { getToken } from "./authService";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { email } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const token = await getToken();
            try {
                if (!email) {
                    throw new Error("Email is not available");
                }

                const response = await fetch(`https://7wd758pes5.execute-api.us-east-1.amazonaws.com/Prod/getorderforcustomer?useremail=${encodeURIComponent(email)}`, {
                    headers: {
                        "Content-Type": "application/json",
                        'x-api-key': awsConfig.apiKey,
                        "Authorization": token
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching order history: ${response.statusText}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [email]);

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Order History</h1>
                <hr />
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : error ? (
                    <h4 className="text-center text-danger">Error: {error}</h4>
                ) : orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.orderID} className="order-box mb-4 mx-auto" style={{ maxWidth: '800px', padding: '10px' }}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                    <div>
                                        <strong>Order No:</strong> {order.orderID}
                                    </div>
                                    <div>
                                        <strong>Total:</strong> ${order.totalAmount}
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index} className="d-flex align-items-center mb-2">
                                                <img src={item.image} alt={item.title} className="img-thumbnail" style={{ width: '50px', height: '50px' }} />
                                                <div className="ml-3">
                                                    {item.title}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="text-right mt-3">
                                        <Link
                                            to={`/order-details`}
                                            state={{ orderDetails: order }}
                                            className="btn btn-outline-dark btn-sm"
                                            style={{ fontSize: '0.8rem', width: '120px' }}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className="text-center">No orders found</h4>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;

