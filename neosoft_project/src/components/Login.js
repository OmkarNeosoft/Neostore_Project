import React, { useState } from "react";
import { login } from "../config/MyService";
import { useNavigate } from "react-router";
import { AddingUser } from "../config/MyService";
import SocialButton from "./SocialButton";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const handleSocialLogin = (user) => {
    console.log(user);
    let data = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      mobile: user._profile.id,
      email: user._profile.email,
      password: "socialLogin",
    };
    AddingUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
      }
    });
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const post = (event) => {
    event.preventDefault();
    login(state)
      .then((res) => {
        if (res.data.err == 0) {
          localStorage.setItem("_token", res.data.token);
          localStorage.setItem("userdetails", state.email);
          localStorage.setItem("user", state.email);

          navigate("/");
        }
        if (res.data.err == 1) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        if (err) {
          alert("Oops! :-( There is some issue at our Server!");
          navigate("/500");
        }
      });
  };

  return (
    <>
      <Header />
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <img src="images/bg.jpg" alt="Image" width={"350px"} />
            </div>

            <div class="col-md-6 contents">
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <div class="mb-4">
                    <h3>Sign In</h3>
                  </div>
                  <form method="post" onSubmit={post}>
                    <div class="form-group first">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email ID"
                        class="form-control"
                        id="username"
                        onChange={handler}
                      />
                    </div>
                    <div class="form-group last mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        class="form-control"
                        id="password"
                        onChange={handler}
                      />
                    </div>

                    <div class="d-flex mb-5 align-items-center">
                      <span class="ml-1">
                        <a href="/register" class="forgot-pass">
                          Sign Up
                        </a>
                      </span>
                      <span class="ml-auto">
                        <a href="/forgot" class="forgot-pass">
                          Forgot Password
                        </a>
                      </span>
                    </div>

                    <input
                      type="submit"
                      value="LOGIN"
                      class="btn btn-block btn-primary"
                    />

                    <span class="d-block text-center my-4 ">
                      &mdash; OR login with &mdash;
                    </span>

                    <div class="social-login">
                      <SocialButton
                        className="fb"
                        provider="facebook"
                        appId="605797154028229"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                      >
                        <FaFacebookMessenger />
                      </SocialButton>
                      <SocialButton
                        className="gmail"
                        provider="google"
                        appId="42776149141-oicfpmhhgnsdd4jjv1b01il2ge1c62a8.apps.googleusercontent.com"
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                      >
                        <SiGmail />
                      </SocialButton>

                      <button className="twitter">
                        <FaTwitter />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
