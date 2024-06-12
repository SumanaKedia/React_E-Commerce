import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from "../components";
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useAuth } from './AuthContext'; // Adjust the path to AuthContext.js accordingly

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const { register, confirmRegistration, error } = useAuth();
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const attributeList = [
            // new CognitoUserAttribute({ Name: 'email', Value: email }),
            new CognitoUserAttribute({ Name: 'name', Value: name })
        ];

        try {
            await register(email, password, attributeList);
            setIsRegistered(true);
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    const handleConfirmation = async (e) => {
        e.preventDefault();
        try {
            await confirmRegistration(email, confirmationCode);
            setIsRegistered(false); // Reset registration status for a new registration
            navigate('/login'); // Redirect to the login page after confirmation
        } catch (err) {
            console.error("Confirmation failed:", err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={isRegistered ? handleConfirmation : handleSignUp}>
                            {!isRegistered && (
                                <>
                                    <div className="form my-3">
                                        <label htmlFor="Name">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Name"
                                            placeholder="Enter Your Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form my-3">
                                        <label htmlFor="Email">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="Email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form my-3">
                                        <label htmlFor="Password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="Password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                            {isRegistered && (
                                <div className="form my-3">
                                    <label htmlFor="ConfirmationCode">Confirmation Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ConfirmationCode"
                                        placeholder="Enter Confirmation Code"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="my-3">
                                <p>
                                    {isRegistered ? 'Need to resend the confirmation code? Click here.' : 'Already have an account? '}
                                    <Link to={isRegistered ? '#' : '/login'} className="text-decoration-underline text-info">
                                        {isRegistered ? 'Resend Code' : 'Login'}
                                    </Link>
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    {isRegistered ? 'Confirm' : 'Register'}
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

export default Register;



