
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound, OrderSuccess, OrderHistory, OrderDetails, CompareProducts, Wishlist } from "./pages";
import { AuthProvider } from './pages/AuthContext'; // Adjust the path of AuthProvider
import ProtectedRoute from './pages/ProtectedRoute'; // Adjust the path of ProtectedRoute



import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Application Component
const App = () => (
  <Provider store={store}>


    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/compare" element={<CompareProducts />} />

            <Route path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route path="order-details"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/wishlist" element={<Wishlist />} /> */}
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </PersistGate>

  </Provider>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Render the application component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);