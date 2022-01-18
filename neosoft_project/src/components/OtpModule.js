import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../config/MyService";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function OtpModule() {
  const navigate = useNavigate();
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [code, setCode] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");

  const back = () => {
    navigate("/forgot");
  };
  const changepwd = () => {
    let data = {
      email: email,
      code: code,
      password: password,
    };
    ChangePassword(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/login");
      }
    });
  };

  return (
    <>
      <div className="contotp">
        <h2>Recover Password</h2>
        <hr />
        <span style={{ color: "red" }}>
          <AiOutlineExclamationCircle /> Verification Code has been sent to your
          registered Email ID
        </span>

        <br />
        <form method="post">
          <div className="col-md-12">
            <br />

            <input
              type="number"
              placeholder="Enter Verfication Code"
              name="code"
              id="code"
              className="formgroup"
              onChange={(event) => {
                setCode(event.target.value);
              }}
              required
            />
            {code != "" && code.length < 4 && (
              <span className="text-danger">Enter Code Correctly!</span>
            )}
            <br />

            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              className="formgroup"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              className="formgroup"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {password != "" && password.length < 8 && (
              <span className="text-danger">Enter password correctly</span>
            )}
            <br />

            <input
              type="password"
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              id="confirmpassword"
              className="formgroup"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
              required
            />
            {confirmpassword != "" && confirmpassword != password && (
              <span className="text-danger">Passwords doesn't match</span>
            )}
            <br />
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <input
                value="Submit"
                className="btn btn-primary text-center"
                onClick={changepwd}
              />
            </div>

            <div className="col-md-6">
              <input
                type="submit"
                value="Back"
                className="btn btn-dark text-center"
                onClick={back}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
