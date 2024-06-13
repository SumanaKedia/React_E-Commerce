import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import awsConfig from '../awsConfig';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OrderSuccess from "./OrderSuccess";
import { clearCart } from "../redux/action";
import { getToken } from "./authService";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.handleCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  // const { register, handleSubmit, reset } = useForm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.qty, 0) + 30;

  const onSubmit = async (formData) => {
    const token = await getToken();
    const orderDetails = {
      useremail: formData.email,
      items: cartItems.map((item) => {
        // const ratingRate = item.rating?.rate ? item.rating.rate.toString() : "";
        // const ratingCount = item.rating?.count ? item.rating.count.toString() : "";

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          price: String(Number(item.price)),  // Ensure price is a number
          qty: String(item.qty),
          // category: item.category,
          // rating: {
          //   rate: ratingRate, // Ensuring rate is a string
          // count: ratingCount // Ensuring count is a string
          // },
        };
      }),

      shippingcost: "30",
      subtotal: String(cartItems.reduce((total, item) => total + Number(item.price) * item.qty, 0)),  // Ensure prices are numbers
      totalAmount: String(cartItems.reduce((total, item) => total + Number(item.price) * item.qty, 0) + 30),  // Ensure prices are numbers
      totalItems: String(cartItems.reduce((total, item) => total + item.qty, 0)),
      userDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        // address2: formData.address2 || "",
        email: formData.email,
        // ccCVV: formData.ccCVV,
        // ccExpiration: formData.ccExpiration,
        // ccName: formData.ccName,
        // ccNumber: formData.ccNumber,
        country: formData.country,
        state: formData.state,
        zip: formData.zip,
      },
    };

    console.log(orderDetails);

    try {
      const response = await fetch("https://7wd758pes5.execute-api.us-east-1.amazonaws.com/Prod/putorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': awsConfig.apiKey,
          "Authorization": token
        },
        body: JSON.stringify(orderDetails),
      });

      const result = await response.json();
      setResponseMessage(result.message);
      if (response.ok) {
        reset();  // Clear form fields after successful submission
        setOrderPlaced(true); // Update state to reflect successful order placement
        dispatch(clearCart()); // Dispatch action to clear the cart
        navigate("/ordersuccess"); // Redirect to OrderSuccess page
      } else {
        setResponseMessage("Failed to process the order. Please try again.");
      }
    } catch (error) {
      console.error("Failed to send data to backend:", error);
      setResponseMessage("Failed to process the order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {orderPlaced ? (
          <OrderSuccess />
        ) : (
          <>
            {cartItems.length ? (
              <div className="row my-4">
                <div className="col-md-7 col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h4 className="mb-0">Billing address</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                          <div className="col-sm-6 my-1">
                            <label className="form-label">First name</label>
                            <input
                              {...register("firstName", {
                                required: "First name is required",
                                maxLength: { value: 50, message: "First name can't exceed 50 characters" },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.firstName && (
                              <div className="text-danger">{errors.firstName.message}</div>
                            )}
                          </div>
                          <div className="col-sm-6 my-1">
                            <label className="form-label">Last name</label>
                            <input
                              {...register("lastName", {
                                required: "Last name is required",
                                maxLength: { value: 50, message: "Last name can't exceed 50 characters" },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.lastName && (
                              <div className="text-danger">{errors.lastName.message}</div>
                            )}
                          </div>
                          <div className="col-12 my-1">
                            <label className="form-label">Email</label>
                            <input
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: "Invalid email format",
                                },
                              })}
                              type="email"
                              className="form-control"
                            />
                            {errors.email && (
                              <div className="text-danger">{errors.email.message}</div>
                            )}
                          </div>
                          <div className="col-12 my-1">
                            <label className="form-label">Address</label>
                            <input
                              {...register("address", {
                                required: "Address is required",
                                maxLength: { value: 100, message: "Address can't exceed 100 characters" },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.address && (
                              <div className="text-danger">{errors.address.message}</div>
                            )}
                          </div>
                          <div className="col-12 my-1">
                            <label className="form-label">Address 2 (Optional)</label>
                            <input
                              {...register("address2", {
                                maxLength: { value: 100, message: "Address can't exceed 100 characters" },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.address2 && (
                              <div className="text-danger">{errors.address2.message}</div>
                            )}
                          </div>
                          <div className="col-md-5 my-1">
                            <label className="form-label">Country</label>
                            <select
                              {...register("country", { required: "Country is required" })}
                              className="form-control"
                            >
                              <option value="">Choose...</option>
                              <option value="USA">United States</option>
                              <option value="CAN">Canada</option>
                              <option value="UK">United Kingdom</option>
                            </select>
                            {errors.country && (
                              <div className="text-danger">{errors.country.message}</div>
                            )}
                          </div>
                          <div className="col-md-4 my-1">
                            <label className="form-label">State</label>
                            <select
                              {...register("state", { required: "State is required" })}
                              className="form-control"
                            >
                              <option value="">Choose...</option>
                              <option value="CA">California</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                            </select>
                            {errors.state && (
                              <div className="text-danger">{errors.state.message}</div>
                            )}
                          </div>
                          <div className="col-md-3 my-1">
                            <label className="form-label">Zip</label>
                            <input
                              {...register("zip", {
                                required: "Zip code is required",
                                pattern: {
                                  value: /^[0-9]{5}$/,
                                  message: "Invalid zip code format",
                                },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.zip && (
                              <div className="text-danger">{errors.zip.message}</div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Name on card</label>
                            <input
                              {...register("ccName", {
                                required: "Name on card is required",
                                maxLength: { value: 50, message: "Name on card can't exceed 50 characters" },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.ccName && (
                              <div className="text-danger">{errors.ccName.message}</div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Credit card number</label>
                            <input
                              {...register("ccNumber", {
                                required: "Credit card number is required",
                                pattern: {
                                  value: /^[0-9]{16}$/,
                                  message: "Invalid credit card number format",
                                },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.ccNumber && (
                              <div className="text-danger">{errors.ccNumber.message}</div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Expiration</label>
                            <input
                              {...register("ccExpiration", {
                                required: "Expiration date is required",
                                pattern: {
                                  value: /^[0-9]{2}\/[0-9]{2}$/,
                                  message: "Invalid expiration format",
                                },

                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.ccExpiration && (
                              <div className="text-danger">{errors.ccExpiration.message}</div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">CVV</label>
                            <input
                              {...register("ccCVV", {
                                required: "CVV is required",
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: "Invalid CVV format",
                                },
                              })}
                              type="text"
                              className="form-control"
                            />
                            {errors.ccCVV && (
                              <div className="text-danger">{errors.ccCVV.message}</div>
                            )}
                          </div>
                        </div>
                        <hr className="my-4" />
                        <button type="submit" className="btn btn-primary btn-lg btn-block">
                          Place Order
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-lg-4">
                  <h4 className="mb-3">Order Summary</h4>
                  <ul className="list-group mb-3">
                    {cartItems.map((item) => (
                      <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">{item.title}</h6>
                          <small className="text-muted">Qty: {item.qty}</small>
                        </div>
                        <span className="text-muted">${item.price * item.qty}</span>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (USD)</span>
                      <strong>${calculateTotal()}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center my-5">
                <h2>Your cart is empty</h2>
                <p>
                  <Link to="/products" className="btn btn-primary">
                    Continue shopping
                  </Link>
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
