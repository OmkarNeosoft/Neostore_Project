import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FetchInvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { MdSaveAlt } from "react-icons/md";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ref = React.createRef();

export default function Invoice() {
  const [temp, settemp] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    FetchInvoice(state.orderno).then((res) => {
      if (res.data.orderdetail) {
        console.log(res.data.orderdetail);
        let datavalue = res.data.orderdetail;
        settemp(datavalue);
        console.log([datavalue]);
        console.log(temp);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);
  console.log(state);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      FetchInvoice(state.orderno).then((res) => {
        if (res.data.orderdetail) {
          console.log(res.data.orderdetail);
          let datavalue = res.data.orderdetail;
          settemp(datavalue);
          console.log([datavalue]);
          console.log(temp);
        } else {
          console.log(res.data.err);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);

  const generatePdf = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://bestinvoicingsoftware.com/assets/1591187049492.jpeg"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("product_invoice.pdf");
    });
  };

  //

  return (
    <div>
      <button className="probtn" onClick={() => generatePdf()}>
        Save PDF <MdSaveAlt />
      </button>
      <div
        className="container"
        fluid
        style={{
          height: "auto",
        }}
      >
        <br />
        <div
          className="card"
          style={{
            padding: "30px",
            // backgroundColor: "rgb(238, 234, 234)",
            maxWidth: "800px",
            // borderRadius: "10px",
            margin: "20px auto",
            height: "auto",
          }}
          ref={ref}
          id="divToPrint"
        >
          <div>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <div>
                    <img
                      src="https://bestinvoicingsoftware.com/assets/1591187049492.jpeg"
                      width="200px"
                      height="100px"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Invoice Number:</h4>
              </div>
            </div>
            <hr />
          </div>
          <div>
            <div className="row">
              <div className="col-md-6 pro">
                <p>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    From
                  </span>
                  <br />
                  <span>NeoStore Public Ltd</span>
                  <br />
                  <span>ns@gmail.com</span>
                  <br />
                  <span>8883772672</span>
                </p>
                <br />

                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                ></span>
                <br />
              </div>
              <div className="col-md-6">
                <span
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  STATUS
                </span>
                <br />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Paid
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {temp.map((value, index) => {
                  return (
                    <tr key={index}>
                      <p style={{ color: "black", fontWeight: "600" }}>
                        {" "}
                        Customer Email : {value.email}
                      </p>
                      <Table striped bordered hover size="md">
                        <thead>
                          <tr className="bg-dark text-white">
                            <th>Sr.No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody style={{ border: "1px solid black" }}>
                          {temp[index].items.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={val.product_image}
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <br />
                                  {val.product_name}
                                </td>
                                <td>{val.quantity}</td>
                                <td>{val.product_cost}</td>
                                <td>{val.quantity * val.product_cost}</td>
                              </tr>
                            );
                          })}

                          <h5>Billing Address:</h5>
                          <p style={{ color: "black", fontWeight: "600" }}>
                            {value.selectaddr.address},{value.selectaddr.city},
                            {value.selectaddr.pincode}
                          </p>
                        </tbody>
                      </Table>
                      <Table striped>
                        <tbody>
                          <tr>
                            <td>
                              <h5>Grand Total: Rs. {value.total}</h5>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </tr>
                  );
                })}
              </div>
            </div>
          </div>
          <br />
          <hr />
          <div>
            <p style={{ color: "black", fontWeight: "600" }}>
              Exchange Time : 10 AM to 11 PM
            </p>
          </div>
        </div>
        <br />
        <container>
          <div className="text-center">&nbsp; &nbsp;&nbsp; &nbsp;</div>
        </container>
      </div>
    </div>
  );
}
