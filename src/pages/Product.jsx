import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
// import { addCart } from "../redux/slices/cartSlice.js";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";
import awsConfig from '../awsConfig';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isCompareVisible, setIsCompareVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${awsConfig.product_baseurl}${id}`, {
                    headers: {
                        'x-api-key': awsConfig.apiKey,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error fetching product: ${response.statusText}`);
                }

                const data = await response.json();
                setLoading(false);
                setProduct(data);
                fetchSimilarProducts(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchSimilarProducts = async (data) => {
            try {
                setLoading2(true);
                const response2 = await fetch(`${awsConfig.product_baseurl}category/${data.category}`, {
                    headers: {
                        'x-api-key': awsConfig.apiKey,
                    },
                });
                if (!response2.ok) {
                    throw new Error(`Error fetching similar products: ${response2.statusText}`);
                }

                const data2 = await response2.json();
                setSimilarProducts(data2);
                setLoading2(false);
            } catch (error) {
                console.error('Error fetching similar products:', error);
            }
        };

        fetchProduct();
    }, [id]);
    // Navigate to compare page 
    const navigateToComparePage = () => {
        navigate('/compare', { state: { selectedProducts, mainProduct: product } });
    };

    const Loading = () => {
        return (
            <div className="container my-5 py-2">
                <div className="row">
                    <div className="col-md-6 py-3">
                        <Skeleton height={400} width={400} />
                    </div>
                    <div className="col-md-6 py-5">
                        <Skeleton height={30} width={250} />
                        <Skeleton height={90} />
                        <Skeleton height={40} width={70} />
                        <Skeleton height={50} width={110} />
                        <Skeleton height={120} />
                        <Skeleton height={40} width={110} inline={true} />
                        <Skeleton className="mx-3" height={40} width={110} />
                    </div>
                </div>
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <div className="container my-5 py-2">
                <div className="row">
                    <div className="col-md-6 col-sm-12 py-3">
                        <img className="img-fluid" src={product.image} alt={product.title} width="400px" height="400px" />
                    </div>
                    <div className="col-md-6 py-5">
                        <h4 className="text-uppercase text-muted">{product.category}</h4>
                        <h1 className="display-5">{product.title}</h1>
                        <p className="lead">{product.rating && product.rating.rate} <i className="fa fa-star"></i></p>
                        <h3 className="display-6 my-4">${product.price}</h3>
                        <p className="lead">{product.description}</p>
                        <button className="btn btn-outline-dark" onClick={() => addProduct(product)}>Add to Cart</button>
                        <Link to="/cart" className="btn btn-dark mx-3">Go to Cart</Link>
                    </div>
                </div>
            </div>
        );
    };

    const Loading2 = () => {
        return (
            <div className="my-4 py-4">
                <div className="d-flex">
                    <div className="mx-4">
                        <Skeleton height={400} width={250} />
                    </div>
                    <div className="mx-4">
                        <Skeleton height={400} width={250} />
                    </div>
                    <div className="mx-4">
                        <Skeleton height={400} width={250} />
                    </div>
                    <div className="mx-4">
                        <Skeleton height={400} width={250} />
                    </div>
                </div>
            </div>
        );
    };
    //Select product for compare
    const ShowSimilarProduct = ({ selectedProducts, setSelectedProducts }) => {
        const handleCheckboxChange = (item) => {
            setSelectedProducts((prev) => {
                if (prev.includes(item)) {
                    return prev.filter((prod) => prod !== item);
                } else if (prev.length < 2) {
                    return [...prev, item];
                }
                return prev;
            });
        };

        useEffect(() => {
            setIsCompareVisible(selectedProducts.length > 0);
        }, [selectedProducts]);

        // Filter out the main product from similar products list
        const filteredSimilarProducts = similarProducts.filter((item) => item.id !== product.id);

        return (
            <div className="py-4 my-4">
                <div className="d-flex">
                    {filteredSimilarProducts.map((item) => (
                        <div key={item.id} className="card mx-4 text-center">
                            <img className="card-img-top p-3" src={item.image} alt="Card" height={300} width={300} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(item)}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                    <label style={{ fontSize: 'small', fontWeight: 'bold' }}>Compare</label>
                                </div>
                            </div>
                            <div className="card-body">
                                <Link to={"/product/" + item.id} className="btn btn-dark m-1">Details</Link>
                                <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };



    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
                <div className="row my-5 py-5">
                    <div className="d-none d-md-block">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <h2 className="me-3">You may also Like</h2>
                                {isCompareVisible && (
                                    <button className="btn btn-dark" onClick={navigateToComparePage}>Compare Products</button>
                                )}
                            </div>
                        </div>
                        <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
                            {loading2 ? <Loading2 /> : <ShowSimilarProduct selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}
                        </Marquee>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;
