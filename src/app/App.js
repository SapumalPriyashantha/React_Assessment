import '../App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import {BrowserRouter as Router,} from "react-router-dom";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn"
import Product from "../pages/Product";
import Cart from "../pages/Cart";


function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="signIn" element={<SignIn/>} />
              <Route path="product" element={<Product/>} />
              <Route path="cart" element={<Cart/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
