import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import MyAccount from "./MyAccount";
import { FetchProfile, updateProfile } from "../config/MyService";
import axios from "axios";
import Header from "../components/Header";

export default function Profile() {
  let [user, setUser] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");

  useEffect(() => {
    FetchProfile(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data = res.data.user;
        setUser(data);
        setEmail(data.email);
        setFname(data.Fname);
        setPhone(data.mobile);
      }
    });
  }, []);

  const ProfileUpdate = (id) => {
    let data = {
      fname: fname,
      lname: lname,
      email: email,
      mobile: phone,
    };
    console.log(data);
    updateProfile(id, data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        window.location.reload();
      }
    });
  };
  const handleSubmit = (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row  ">
          <div className="col-md-4">
            <MyAccount />
          </div>
          <div className="col-md-6">
            <br />
            <br />
            {!showInvoice && (
              <>
                <table className="table bordered">
                  <tr>
                    <th>First Name : </th>
                    <td>&nbsp;&nbsp;{user.fname}</td>
                  </tr>
                  <br />
                  <tr>
                    <th>Last Name : </th>
                    <td>&nbsp;&nbsp;{user.lname}</td>
                  </tr>
                  <br />
                  <tr>
                    <th>Email ID : </th>
                    <td>&nbsp;&nbsp;{user.email}</td>
                  </tr>
                  <br />
                  <tr>
                    <th>Mobile no : </th>
                    <td>&nbsp;&nbsp;{user.mobile}</td>
                  </tr>
                  <br />
                </table>
                <br />
                <button className="probtn" onClick={() => setShowInvoice(true)}>
                  EDIT PROFILE
                </button>
              </>
            )}
            {showInvoice && (
              <div className="m-1">
                <div className="card1">
                  <h2 className="text-center pt-3 p-3">Update Profile </h2>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>First Name</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          fname="lname"
                          defaultValue={user.fname}
                          onChange={(e) => {
                            setFname(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>Last Name</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          name="fname"
                          defaultValue={user.lname}
                          onChange={(e) => {
                            setLname(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b>Email</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter Email"
                          name="email"
                          defaultValue={user.email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3">
                        <b> Mobile</b>
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Enter mobile number"
                          name="phone"
                          defaultValue={user.mobile}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Button
                      variant="info"
                      onClick={() => ProfileUpdate(user._id)}
                      className="mt-3"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setShowInvoice(false)}
                      className="mt-3 ml-3"
                    >
                      Close
                    </Button>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
