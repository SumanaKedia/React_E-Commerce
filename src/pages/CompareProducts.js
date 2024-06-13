import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Compare = () => {
    const location = useLocation();
    const { selectedProducts, mainProduct } = location.state || { selectedProducts: [], mainProduct: null };

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h2 className="mb-4">Compare Products</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center align-middle">Products</th>
                            {mainProduct && (
                                <th className="text-center align-middle">
                                    <img
                                        src={mainProduct.image}
                                        alt={mainProduct.title}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                    <br />
                                    <Link to={"/product/" + mainProduct.id} className="btn btn-dark mt-2">
                                        View Product
                                    </Link>
                                </th>
                            )}
                            {selectedProducts.map((product) => (
                                <th key={product.id} className="table-header text-center align-middle">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                    <br />
                                    <Link to={"/product/" + product.id} className="btn btn-dark mt-2">
                                        View Product
                                    </Link>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center align-middle">Title</td>


                            {mainProduct && <td>{mainProduct.title}</td>}
                            {selectedProducts.map((product) => (
                                <td key={product.id}>{product.title}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="table-header text-center align-middle">Category</td>
                            {mainProduct && <td>{mainProduct.category}</td>}
                            {selectedProducts.map((product) => (
                                <td key={product.id}>{product.category}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="table-header text-center align-middle">Rating</td>
                            {mainProduct && (
                                <td>
                                    {mainProduct.rating && mainProduct.rating.rate} <i className="fa fa-star"></i>
                                </td>
                            )}
                            {selectedProducts.map((product) => (
                                <td key={product.id}>
                                    {product.rating && product.rating.rate} <i className="fa fa-star"></i>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="table-header text-center align-middle">Price</td>
                            {mainProduct && <td>${mainProduct.price}</td>}
                            {selectedProducts.map((product) => (
                                <td key={product.id}>${product.price}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="table-header text-center align-middle">Description</td>
                            {mainProduct && <td>{mainProduct.description}</td>}
                            {selectedProducts.map((product) => (
                                <td key={product.id}>{product.description}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Compare;





