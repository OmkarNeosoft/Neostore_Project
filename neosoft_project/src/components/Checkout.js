import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authentication } from "../config/MyService";
import Header from "./Header";
import { useLocation } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [paymentcard, setPaymentCard] = useState(0);
  const [cvv, setCVV] = useState(0);
  const [cart, setCart] = useState([]);
  console.log(state);
  console.log(state.orderno);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      authentication(localStorage.getItem("_token")).then((res) => {
        if (res.data.err) {
          alert(res.data.msg);
        }
      });
    } else {
      alert("Login first!");
      navigate("/login");
    }
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);
    console.log(cartItems);
  }, []);

  const checkout = () => {
    navigate("/address", {
      state: { orderno: state.orderno },
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <br />
            <h3 className="text-center">
              Your Total is (GST+Product) : {localStorage.getItem("total")}
            </h3>
          </div>
          <br />
        </div>
        <br />
        <div className="card">
          <h3>Checkout </h3>
          <br />
          <input
            type="number"
            placeholder="Enter 16 Digit card number"
            className="form-control"
            name="paymentcard"
            onChange={(e) => {
              setPaymentCard(e.target.value);
            }}
          />
          {paymentcard != "" && paymentcard.length < 16 && (
            <span className="text-danger">Enter 16 Digits Number</span>
          )}
          <br />
          <input
            type="number"
            placeholder="Enter CVV"
            className="form-control"
            name="cvv"
            onChange={(e) => {
              setCVV(e.target.value);
            }}
          />
          {cvv != "" && cvv.length < 3 && (
            <span className="text-danger">Enter 3 Digits Number</span>
          )}
          <br />
          <button className="btn btn-primary" onClick={() => checkout()}>
            Go to Next Page
          </button>
        </div>
        &nbsp;
      </div>
    </>
  );
}
