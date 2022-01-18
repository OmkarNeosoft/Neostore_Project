import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { MdModeEdit, MdCheckCircleOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import {
  FetchAddress,
  addAddress,
  editAddress,
  UserSelectedAddress,
} from "../config/MyService";
import Header from "../components/Header";

export default function Address() {
  const [errors, setError] = useState({
    err_oldpass: "",
    err_npass: "",
    err_cpass: "",
    err_fname: "",
    err_lname: "",
    err_mobile: "",
    err_address: "",
    err_pincode: "",
    err_city: "",
    err_state: "",
    err_country: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [flagshowaddress, setShowadd] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [countrystate, setCountrystate] = useState("");
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(false);
  const [Address_id, setAddress_id] = useState("");
  const [getAddress, setGetAddress] = useState([]);
  const { state } = useLocation();

  console.log(getAddress);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      FetchAddress(localStorage.getItem("user")).then((res) => {
        setGetAddress(res.data.address);
        console.log(res.data.address);
      });
    } else {
      navigate("/login");
    }
  }, []);

  const Addnewaddress = (e) => {
    e.preventDefault();
    console.log("Add Address");
    let email = localStorage.getItem("user");
    let data = {
      email: email,
      address: address,
      pincode: pincode,
      city: city,
      state: countrystate,
      country: country,
    };
    console.log(data);
    addAddress(data).then((res) => {
      console.log(res.data);
    });
    setShow(false);
  };

  const editadd = (event, addressdata) => {
    event.preventDefault();
    console.log(addressdata);
    console.log("edit  address clicked");
    setAddress(addressdata.address);
    setPincode(addressdata.pincode);
    setCity(addressdata.city);
    setCountrystate(addressdata.countrystate);
    setCountry(addressdata.country);
    setAddress_id(addressdata.Address_id);
    setShowadd(true);
    console.log(flagshowaddress);
  };

  const Addaddress = (e) => {
    e.preventDefault();
    let update = true;
    console.log("Add Address");
    let email = localStorage.getItem("user");
    let data = {
      Address_id: Address_id,
      email: email,
      address: address,
      pincode: pincode,
      city: city,
      state: countrystate,
      country: country,
      update: update,
    };
    console.log(data);
    editAddress(data).then((res) => {
      console.log(res.data);
    });

    setShowadd(false);
    window.location.reload();
  };

  const selectadd = (e, addressdata) => {
    e.preventDefault();
    console.log(addressdata);
    let usersaddress = {
      email: localStorage.getItem("user"),
      selectaddr: addressdata,
      orderno: state.orderno,
    };
    UserSelectedAddress(usersaddress).then((res) => {
      console.log(res.data);
      alert("Order placed Successfully");
      localStorage.removeItem("mycart");
      navigate("/thankyou");
    });
  };



  return (
    <>
      <Header />
      <div className="container-fluid" style={{ border: "3px solid black" }}>
        <div className="row">
          <div className="col-md-5">
            <MyAccount />
          </div>
          <br />
          <div
            className="col-md-6 "
            style={{
              border: "3px solid black",
              height: "700px",
              marginTop: "50px",
            }}
          >
            <br />
            <br />

            <div>
              <div className="row">
                <div className="col-md-8">
                  <h3 className="text-left">&nbsp; Your Addresses</h3>
                </div>
                <div className="col-md-4">
                  <button className="myacbtn" onClick={handleShow}>
                    Add Address
                  </button>
                </div>
              </div>
              <hr />
            </div>

            <div>
              {getAddress.map((addressdata) => (
                <Row>
                  <div>
                    <h6>
                      {addressdata.address}, {addressdata.state}
                    </h6>
                    <h6>
                      {addressdata.city} ,{addressdata.pincode}
                    </h6>
                    <h6>{addressdata.country}</h6>
                    <div>
                      <button
                        className="ainbtn"
                        onClick={(e) => {
                          editadd(e, addressdata);
                        }}
                      >
                        <MdModeEdit /> EDIT
                      </button>
                      &nbsp;
                      <button
                        className="ainbtn"
                        onClick={(e) => {
                          selectadd(e, addressdata);
                        }}
                      >
                        <MdCheckCircleOutline /> SELECT
                      </button>
                      &nbsp;
                      <br />
                      <br />
                      <hr />
                    </div>
                  </div>

                  {flagshowaddress ? (
                    <Modal show={flagshowaddress} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Your Account Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <h6>Edit Your Account</h6>
                          <FloatingLabel label="Address" className="mb-3">
                            <Form.Control
                              as="textarea"
                              placeholder="Address"
                              name="address"
                              id="address"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                            />
                            <Form.Text id="passwordHelpBlock" muted>
                              Max 100 char
                            </Form.Text>
                            <span style={{ color: "red" }}>
                              {errors.err_address}
                            </span>
                          </FloatingLabel>

                          <Row>
                            <Col sm={6} md={6} lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="number"
                                  name="pincode"
                                  placeholder="Pincode"
                                  value={pincode}
                                  onChange={(e) => {
                                    setPincode(e.target.value);
                                  }}
                                  className="form-control"
                                  size="20"
                                />
                                <span style={{ color: "red" }}>
                                  {errors.err_pincode}
                                </span>
                              </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                              {" "}
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="city"
                                  placeholder="City"
                                  value={city}
                                  onChange={(e) => {
                                    setCity(e.target.value);
                                  }}
                                  className="form-control"
                                  size="20"
                                />
                                <span style={{ color: "red" }}>
                                  {errors.err_city}
                                </span>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              name="state"
                              placeholder="State"
                              value={countrystate}
                              onChange={(e) => {
                                setCountrystate(e.target.value);
                              }}
                              className="form-control"
                              size="20"
                            />
                            <span style={{ color: "red" }}>
                              {errors.err_state}
                            </span>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              name="country"
                              placeholder="Country"
                              value={country}
                              onChange={(e) => {
                                setCountry(e.target.value);
                              }}
                              className="form-control"
                              size="20"
                            />
                            <span style={{ color: "red" }}>
                              {errors.err_country}
                            </span>
                          </Form.Group>

                          <div style={{ textAlign: "center" }}>
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={Addaddress}
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  ) : (
                    ""
                  )}
                </Row>
              ))}
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Address Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <FloatingLabel label="Address" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Address"
                      name="address"
                      id="address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                      Max 100 char
                    </Form.Text>
                    {<span style={{ color: "red" }}>{errors.err_address}</span>}
                  </FloatingLabel>

                  <Row>
                    <Col sm={6} md={6} lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="number"
                          name="pincode"
                          placeholder="Pincode"
                          onChange={(e) => {
                            setPincode(e.target.value);
                          }}
                          className="form-control"
                          size="20"
                        />
                        {
                          <span style={{ color: "red" }}>
                            {errors.err_pincode}
                          </span>
                        }
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                      {" "}
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          className="form-control"
                          size="20"
                        />
                        {
                          <span style={{ color: "red" }}>
                            {errors.err_city}
                          </span>
                        }
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="countrystate"
                      placeholder="State"
                      onChange={(e) => {
                        setCountrystate(e.target.value);
                      }}
                      className="form-control"
                      size="20"
                    />
                    {<span style={{ color: "red" }}>{errors.err_state}</span>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="Country"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                      className="form-control"
                      size="20"
                    />
                    {<span style={{ color: "red" }}>{errors.err_country}</span>}
                  </Form.Group>

                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={Addnewaddress}
                    >
                      Submit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
