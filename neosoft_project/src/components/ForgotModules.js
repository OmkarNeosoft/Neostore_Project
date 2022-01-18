import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { ForgotModule } from "../config/MyService";
import OtpModule from "./OtpModule";
import "./Style.css";
import Header from "./Header";
import Footer from "./Footer";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function ForgotModules() {
  const [flag, setFlag] = useState(0);
  let [email, setEmail] = useState("");
  const navigate = useNavigate();

  const back = () => {
    navigate("/login");
  };
  const sendotp = () => {
    let data = {
      email: email,
    };
    ForgotModule(data).then((res) => {
      if (res.data.err) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
        navigate("/otp");
      }
    });
  };

  return (
    <div>
      <Header />
      <br />
      {flag == 0 ? (
        <div className="cont">
          <br />
          <div>
            <h2>Recover Password</h2>
          </div>
          <hr />
          <br />
          <form method="post" className="container">
            <input
              type="email"
              placeholder="Enter your email ID"
              name="email"
              id="email"
              className="form-control"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}
            <br />
            <br />
            <div className="row">
              <div className="col-md-6">
                <input
                  value="Send OTP"
                  onClick={sendotp}
                  className="btn btn-primary text-center"
                />
              </div>
              <div className="col-md-6">
                <input
                  value="Back "
                  onClick={back}
                  className="btn btn-dark text-center"
                />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <OtpModule />
      )}
      <Footer />
    </div>
  );
}
