import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FetchProfile, changePass } from "../config/MyService";
import MyAccount from "./MyAccount";
import Header from "../components/Header";

export default function ChangePassword() {
  let [password, setPassword] = useState("");
  let [newpassword, setNewpassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  let [user, setUser] = useState("");
  const [errors, setError] = useState({
    err_vcode: "",
    err_npass: "",
    err_cpass: "",
    err_email: "",
  });
  let [otp, setOtp] = useState("");
  const vcode = useRef("");
  const navigate = useNavigate();
  const handler = (event) => {
    const name = event.target.name;
    switch (name) {
      case "vcode":
        console.log(user.confirmpassword);
        console.log(user.name);
        console.log(vcode.current.value == user.confirmpassword);
        const e_vcode =
          vcode.current.value == user.confirmpassword
            ? ""
            : "Password does not match";
        setError({ err_vcode: e_vcode });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    FetchProfile(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        setUser(res.data.user);
      }
    });
  }, []);

  const changepassword = async (id) => {
    let data = { password: password, confirmpassword: confirmpassword };
    console.log(data);
    changePass(id, data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/profile");
      }
    });
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <MyAccount />
          </div>

          <div className="col-md-7">
            <br />
            <br />

            <div className="cardtitle">
              <h3>Change Password </h3>
            </div>
            <hr />
            <form>
              <div class="form-group">
                <label>Old Password</label>

                <input
                  type="text"
                  placeholder="Enter Old Password"
                  name="vcode"
                  onChange={handler}
                  className="form-control"
                  ref={vcode}
                />
              </div>

              <div class="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  name="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {password != "" && password.length < 8 && (
                  <span className="text-danger"></span>
                )}
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="newpassword"
                  className="form-control"
                  onChange={(e) => {
                    setConfirmpassword(e.target.value);
                  }}
                />
                {confirmpassword != "" && confirmpassword != password && (
                  <span className="text-danger"></span>
                )}
              </div>
              <button
                className="inbtn"
                onClick={() => changepassword(user._id)}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
