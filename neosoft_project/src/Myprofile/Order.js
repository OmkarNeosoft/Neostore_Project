import React from "react";
import { useState, useEffect, useRef } from "react";
import { getOrderdata } from "../config/MyService";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router";
import { AiOutlineFilePdf } from "react-icons/ai";
import Header from "../components/Header";

export default function Order() {
  let [variable, setVariable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderdata(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let itemdata = res.data.user;
        setVariable(itemdata);
        console.log([itemdata]);
        console.log(variable);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);
  const invoice = (orderno) => {
    navigate("/invoice", {
      state: { orderno: orderno },
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
            <div style={{ border: "1px solid black" }}>
              {variable.map((value, index) => {
                return (
                  <div key={index} style={{ border: "1px solid black" }}>
                    <p className="orderdes">
                      <span className="text-success"> In transit</span>: Order
                      By:
                    </p>
                    <p className="orderdes">
                      <span className="text-danger"> Placed On</span>:
                      {value.date}
                    </p>
                    <div className="col-md-12">
                      {variable[index].items.map((val) => {
                        return (
                          <div className="col-md-12">
                            <img
                              src={val.product_image}
                              height="170px"
                              width="160px"
                            />
                          </div>
                        );
                      })}
                      <br />
                      <div className="col-md-12 ">
                        <button
                          className="inbtn"
                          onClick={() => invoice(value.Orderno)}
                        >
                          {" "}
                          <AiOutlineFilePdf />
                          VIEW INVOICE PDF
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
