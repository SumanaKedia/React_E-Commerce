
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
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
    const [pages, setPages] = useState([{ startKey: null }]);
    const [currentPage, setCurrentPage] = useState(1);
    const { email } = useAuth();
    const limit = 6;

    const fetchOrders = async (page = 1) => {
        setLoading(true);
        const token = await getToken();
        try {
            if (!email) {
                throw new Error("Email is not available");
            }

            const startKey = pages[page - 1].startKey;

            const url = new URL('https://7wd758pes5.execute-api.us-east-1.amazonaws.com/Prod/getorderforcustomer');
            url.searchParams.append('useremail', encodeURIComponent(email));
            url.searchParams.append('limit', limit);
            if (startKey) {
                url.searchParams.append('startKey', encodeURIComponent(JSON.stringify(startKey)));
            }

            const response = await fetch(url, {
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
            setOrders(data.items);
            setLastEvaluatedKey(data.lastEvaluatedKey);

            // Update the pages array only if there is a lastEvaluatedKey
            if (data.lastEvaluatedKey && !pages[page]) {
                setPages(prevPages => {
                    const newPages = [...prevPages];
                    newPages[page] = { startKey: data.lastEvaluatedKey };
                    return newPages;
                });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [email]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchOrders(page);
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Order History</h1>
                <hr />
                {loading && orders.length === 0 ? (
                    <h4 className="text-center">Loading...</h4>
                ) : error ? (
                    <h4 className="text-center text-danger">Error: {error}</h4>
                ) : orders.length > 0 ? (
                    <>
                        {orders.map((order) => (
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
                                            <div style={{ marginBottom: '10px' }}>
                                                <strong>Status:</strong> {order.orderStatus}
                                            </div>
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
                        ))}
                        <div className="text-center">
                            {Array.from({ length: pages.length }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                                    disabled={loading}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <h4 className="text-center">No orders found</h4>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderHistory;
