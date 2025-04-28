import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
function Navbar() {
  const cartItems = useSelector((state) => state.Cart.items);
  return (
    <div>
      <nav className="navbar-container">
        <div className="navbar-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="navbar-Links">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/cart">
            Cart({cartItems.length})
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
