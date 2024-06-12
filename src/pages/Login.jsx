import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path to AuthContext.js accordingly
import { Footer } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();
  const maxRetries = 3; // Set the maximum number of retries

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (retryCount >= maxRetries) {
      setError("Maximum login attempts exceeded. Please try again later.");
      return;
    }

    if (email === "" || password === "") {
      setError("Email and Password are required");
      return;
    }

    try {
      await login(email, password);
      navigate("/"); // Redirect to your home page or other desired page.
    } catch (err) {
      setRetryCount(retryCount + 1);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
              {error && <div className="text-center text-danger my-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;




