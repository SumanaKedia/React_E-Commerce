
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addWishlistItem, removeWishlistItem } from "../redux/action/index";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import awsConfig from '../awsConfig';
import { useAuth } from "../pages/AuthContext";


const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated, email } = useAuth();

  const cartState = useSelector(state => state.handleCart);

  const stateOfwish = useSelector(state => state.wishlist);
  const userWishlist = (stateOfwish.wishlists && stateOfwish.wishlists[email]) || [];



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${awsConfig.product_baseurl}`, {
          headers: {
            'x-api-key': awsConfig.apiKey
          }
        });
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const products = await response.json();
        setData(products);
        setFilter(products); // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);





  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  const addProductToWishlist = (product) => {

    if (authenticated) {
      dispatch(addWishlistItem(email, product));
      alert("Product added to Wishlist")
    } else {
      alert("You have to login to use Wishlist");
      // navigate('/login');
    }
  }

  const removeProductFromWishlist = (product) => {
    if (authenticated) {
      dispatch(removeWishlistItem(email, product));
      alert("Product removed from Wishlist")
    } else {
      // alert("Please log in to remove items from your wishlist.");
      alert("You have to login to use Wishlist");
      // navigate('/login');
    }
  };

  const toggleProductSelection = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((p) => p !== product);
      } else {
        if (prevSelected.length < 3) {
          return [...prevSelected, product];
        }
        return prevSelected;
      }
    });
  };

  const navigateToComparePage = () => {
    navigate("/compare", { state: { selectedProducts } });
  };

  const LoadingSkeleton = () => (
    <div className="row">
      <Skeleton height={300} count={6} />
    </div>
  );

  const FilteredProducts = () => (
    <>
      <div className="buttons text-center py-3">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => {
          setFilter(data);
          setIsFiltered(false);
          setSelectedProducts([]); // Clear selected products
        }}>All</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => {
          filterByCategory("men's clothing");
          setIsFiltered(true);
          setSelectedProducts([]); // Clear selected products when filter changes
        }}>Men's Clothing</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => {
          filterByCategory("women's clothing");
          setIsFiltered(true);
          setSelectedProducts([]); // Clear selected products when filter changes
        }}>Women's Clothing</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => {
          filterByCategory("jewelery");
          setIsFiltered(true);
          setSelectedProducts([]); // Clear selected products when filter changes
        }}>Jewelry</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => {
          filterByCategory("electronics");
          setIsFiltered(true);
          setSelectedProducts([]); // Clear selected products when filter changes
        }}>Electronics</button>
      </div>
      {selectedProducts.length > 0 && isFiltered && (
        <div className="fixed-bottom d-flex justify-content-center mb-4">
          <button className="btn btn-dark" onClick={navigateToComparePage}>
            Compare Selected Products
          </button>
        </div>
      )}

      <div className="row">
        {filter.map((product) => {
          const isProductInWishlist = userWishlist.find(item => item.id === product.id);
          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card text-center">

                <Link to={`/product/${product.id}`}>
                  <img
                    className="card-img-top p-3"
                    src={product.image}
                    alt="Card"
                    height={300}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
                  <p className="card-text">{product.description.substring(0, 90)}...</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                    Details
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProductToCart(product)}>
                    Add to Cart
                  </button>

                  <button className="btn btn-dark mx-3" onClick={() => {
                    if (!isProductInWishlist) {
                      addProductToWishlist(product);
                    } else {
                      removeProductFromWishlist(product);
                    }
                  }}>
                    <i className={`fa${isProductInWishlist ? 's' : 'r'} fa-heart`}></i>
                  </button>

                  {isFiltered && (
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedProducts.includes(product)}
                        onChange={() => toggleProductSelection(product)}
                      />
                      <label className="form-check-label">Compare</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  const filterByCategory = (category) => {
    const filteredProducts = data.filter((product) => product.category === category);
    setFilter(filteredProducts);
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row">
        {loading ? <LoadingSkeleton /> : <FilteredProducts />}
      </div>
    </div>
  );
};

export default Products;








