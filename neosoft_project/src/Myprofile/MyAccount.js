import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsArrowLeftRight } from "react-icons/bs";
import { MdAccountBox, MdLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { RiUploadCloudLine } from "react-icons/ri";
import {
  FetchProfile,
  getMulter,
  getImage,
  updateProfile,
} from "../config/MyService";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function MyAccount() {
  let [user, setUser] = useState([]);

  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  const [mainimage, setMainImage] = useState("");
  const [profileImg, setprofileImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      FetchProfile(localStorage.getItem("user")).then((res) => {
        if (res.data.user) {
          console.log(res.data.user);
          let data = res.data.user;
          setUser(data);
          setEmail(data.email);
          setName(data.name);
          setPhone(data.phone);
        }
      });
    } else {
      navigate("/");
    }
  }, []);

  const onFileChange = (e) => {
    setprofileImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container-fluid">
        <div className=" text-center ">
          <br />
          <br />
          <img
            src="images/user.jpg"
            height="300px"
            width="500px"
            className="container"
          ></img>
          <br />
          <br />
          <div>
            <div className="row ">
              <form>
                <div className="container text-center">
                  <div className="form-group   text-center">
                    <input
                      type="file"
                      onChange={onFileChange}
                      className="form-control sha "
                    />
                  </div>
                  <br />
                  <div className="form-group text-center">
                    <button className="myacbtn " type="submit">
                      <RiUploadCloudLine /> Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
          <div className="col-md-12" style={{ fontSize: "30px" }}>
            {user.fname}&nbsp;{user.lname}
          </div>
          <br />
          <div>
            <a className="myacbtn" href="/order">
              <HiOutlineMenuAlt2 /> Previous Order
            </a>
            <br />
            <br />
            <br />
            <a className="myacbtn" href="/profile">
              <MdAccountBox /> View Profile
            </a>
            <br />
            <br />
            <br />
            <a className="myacbtn" href="/address">
              <MdLibraryBooks /> Saved Address
            </a>
            <br />
            <br />
            <br />
            <a className="myacbtn" href="/changepassword">
              <BsArrowLeftRight /> Change Passsword
            </a>
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
