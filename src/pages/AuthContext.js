
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { login, register, confirmRegistration, logout } from './authService'; // Import the authService functions
import userPool from './CognitoUserPool';
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/action";


const AuthContext = createContext();

const initialState = {
    authenticated: false,
    email: null,
    name: null,
    token: null,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authenticated: true,
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token,
                error: null,
            };
        case 'LOGOUT':
            return initialState;
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                email: action.payload.email,
                error: null,
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            };
        case 'CONFIRMATION_SUCCESS':
            return {
                ...state,
                authenticated: true,
                error: null,
            };
        case 'CONFIRMATION_FAILURE':
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const dispatchcart = useDispatch();
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [userAttributes, setUserAttributes] = useState({});

    // const loginHandler = async (email, password) => {
    //     try {
    //         const result = await login(email, password);
    //         // Update user attributes after successful login
    //         const cognitoUser = userPool.getCurrentUser();
    //         cognitoUser.getUserAttributes((err, attributes) => {
    //             if (err) throw err;
    //             const attributesMap = attributes.reduce((map, attr) => {
    //                 map[attr.Name] = attr.Value;
    //                 return map;
    //             }, {});
    //             setUserAttributes(attributesMap);

    //             dispatch({
    //                 type: 'LOGIN_SUCCESS',
    //                 payload: {
    //                     email: attributesMap.email || result.email,
    //                     name: attributesMap.name || result.name,
    //                     token: result.token,
    //                     authenticated: true,
    //                 },
    //             });
    //         });
    //     } catch (error) {
    //         dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.message } });
    //     }
    // };

    const loginHandler = async (email, password) => {
        try {
            const result = await login(email, password);

            dispatch({ type: 'LOGIN_SUCCESS', payload: result });
        } catch (error) {

            dispatch({ type: 'LOGIN_FAILURE', payload: { error: error.message } });
        }
    };


    const registerHandler = async (email, password, attributes) => {
        try {
            await register(email, password, attributes);
            dispatch({ type: 'REGISTER_SUCCESS', payload: { email } });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILURE', payload: { error: error.message } });
        }
    };

    const confirmRegistrationHandler = async (email, code) => {
        try {
            await confirmRegistration(email, code);
            dispatch({ type: 'CONFIRMATION_SUCCESS' });
            await loginHandler(email, code); // Automatically log in the user after confirmation
        } catch (error) {
            dispatch({ type: 'CONFIRMATION_FAILURE', payload: { error: error.message } });
        }
    };

    const logoutHandler = async () => {
        try {
            await logout();
            // dispatchcart(clearCart());
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error("Logout Error: ", error.message);
        }
    };



    useEffect(() => {
        const initializeAuthState = async () => {
            try {
                const cognitoUser = userPool.getCurrentUser();
                if (cognitoUser) {
                    cognitoUser.getSession((err, session) => {
                        if (err) {
                            console.error("Failed to get session:", err);
                            return;
                        }
                        cognitoUser.getUserAttributes((err, attributes) => {
                            if (err) {
                                console.error("Failed to get user attributes:", err);
                                return;
                            }
                            const attributesMap = {};
                            attributes.forEach(attr => {
                                attributesMap[attr.Name] = attr.Value;
                            });
                            setUserAttributes(attributesMap);
                            dispatch({
                                type: 'LOGIN_SUCCESS',
                                payload: {
                                    email: attributesMap.email || cognitoUser.getUsername(),
                                    name: attributesMap.name || null,
                                    authenticated: true,
                                    token: session.getIdToken().getJwtToken(),
                                },
                            });

                        });
                    });
                }
            } catch (error) {
                console.error("Failed to initialize auth state:", error);
            }
        };

        initializeAuthState();
    }, []); // Empty dependency array ensures this runs only once on mount



    return (
        <AuthContext.Provider value={{ ...state, userAttributes, login: loginHandler, logout: logoutHandler, register: registerHandler, confirmRegistration: confirmRegistrationHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



