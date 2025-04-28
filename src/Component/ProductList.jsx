import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetProduct } from "../Feathures/ProductSlice";
import { addToCart } from "../Feathures/CardSlice";
function ProductList() {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetProduct());
    }
  }, [status]);
  if (status === "loading") {
    return <p>Product is laoding.....</p>;
  }
  if (status === "failed")
    return <p>Failed to Load Products.please Try aagians</p>;
  return (
    <div className="product-page">
      <Navbar />
      <div className="product-list-container">
        <h2 className="product-list-title">Our Products</h2>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                <img src={item.image} alt="myimage" />
              </div>
              <div className="product-detail">
                <h2 className="product-title">
                  {item.title.length > 20
                    ? `${item.title.slice(0, 20)}...`
                    : item.title}
                </h2>
                <p className="product-description">
                  {item.description.substring(0, 60)}
                </p>
              </div>
              <div className="product-footer">
                <p className="product-price">{item.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
