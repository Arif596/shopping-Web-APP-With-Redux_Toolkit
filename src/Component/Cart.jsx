import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  upadateValueCart,
  updateQuantityCart,
  clearCart,
} from "../Feathures/CardSlice";
function Cart() {
  const [paymentStage, setPaymentStage] = useState("cart");
  const [showMessage, setShowMessage] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const navigate = useNavigate();
  const {
    items: cartItem,
    tempItems,
    totalPrice,
  } = useSelector((state) => state.Cart);

  const dispatch = useDispatch();
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleUpdatequantity = (id, quantity) => {
    dispatch(updateQuantityCart({ id, quantity }));
  };
  const handleUpdate = () => {
    tempItems.forEach((item) => {
      dispatch(upadateValueCart(item.id));
    });
  };
  const handleProceedToPayment = () => {
    setPaymentStage("payment");
  };
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStage("success");
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setPaymentStage("cart");
      dispatch(clearCart());
      setPaymentForm({
        cardNumber: "",
        expiry: "",
        cvv: "",
        name: "",
      });
    }, 5000);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <div className="container">
        <div className="card mt-5">
          {showMessage && (
            <div className="alert alert-success text-center">
              Payement Successfull! Thank You for Your Purchase
            </div>
          )}
          {/* <h1 className="mb-4 text-center mt-3">Cart page</h1> */}
          {cartItem.length === 0 &&
          paymentStage !== "success" &&
          !showMessage ? (
            <div className="cart-empty">
              <h2>Your Cart is empty</h2>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          ) : (
            <div className="row align-items-start border-bottom pb-3 ms-5">
              {cartItem.map((item) => (
                <>
                  <div key={item.id}>
                    <img className="img" src={item.image} alt="image" />

                    <h3>{item.title}</h3>
                    <p>
                      price:<strong>{item.price.toFixed(2)}</strong>
                    </p>
                    <div className="newRow">
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="number"
                          value={
                            tempItems.find(
                              (tempItems) => tempItems.id === item.id
                            )?.quantity || item.quantity
                          }
                          onChange={(e) =>
                            handleUpdatequantity(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary rmbtn"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger rmbtn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="cart-total">
                <p>
                  Total Price is:<strong>${totalPrice.toFixed(2)}</strong>
                </p>
                <button onClick={() => navigate("/")}>Back to Shopping</button>
                <button onClick={handleProceedToPayment}>Add to Card</button>
              </div>
            </div>
          )}
          {paymentStage === "payment" && (
            <div className="payment-form-container">
              <h2>Payment Information</h2>
              <form action="" onSubmit={handlePaymentSubmit}>
                <div className="Mainrow">
                  <div className="col-md-5 ">
                    <label htmlFor="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="cardNumber"
                      value={paymentForm.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <label className="form-label">Expiration Date</label>
                    <input
                      type="date"
                      className="form-control form-control form-control-sm inputfield"
                      name="expiry"
                      value={paymentForm.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>

                <div className="Mainrow">
                  <div className="col-md-5 mb-3">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control inputfield"
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-5 mb-4">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      className="form-control inputfield"
                      name="name"
                      value={paymentForm.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                <div className="Mainrow">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-3"
                      onClick={() => setPaymentStage("cart")}
                    >
                      Back to Cart
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Complete Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
