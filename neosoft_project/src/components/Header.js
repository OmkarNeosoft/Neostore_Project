import React from "react";
import {
  Container,
  Navbar,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Nav,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Style.css";

export default function Header(props) {
  const [flag, setFlag] = useState(1);
  const [cartvalue, setCartValue] = useState(0);
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.clear();
    setFlag(0);

    navigate("/");
  };

  useEffect(() => {
    let itemAvailable = JSON.parse(localStorage.getItem("mycart"));

    if (itemAvailable) {
      setCartValue(itemAvailable.length);

      console.log(itemAvailable.length);
    }
  }, []);

  return (
    <div>
      <Navbar className="bg-dark" expand="lg">
        <Navbar.Brand href="#" style={{ color: "white" }}>
          Neo
          <span style={{ color: "red" }}>STORE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-lg-0" navbarScroll>
            <li class="nav-item">
              <a class="nav-link" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/product">
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/order">
                Orders
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/address">
                Address
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/myaccount">
                My Account
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">
                Profile
              </a>
            </li>
          </Nav>
          <form className="  d-flex">
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="searchfield"
            />
            &nbsp;
            <button className="ml-1 searchbutton">Search</button>&nbsp;
            <a className="ml-1 cartbutton" href="/cart">
              <AiOutlineShoppingCart size={"30px"} style={{ color: "black" }} />
              {cartvalue}
            </a>
            <NavDropdown className="ml-1" id=" navbarScrollingDropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              {localStorage.getItem("user") ? (
                <NavDropdown.Item href="/myaccount">
                  My Account
                </NavDropdown.Item>
              ) : (
                " "
              )}

              {localStorage.getItem("user") ? (
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              ) : (
                " "
              )}
            </NavDropdown>
          </form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
