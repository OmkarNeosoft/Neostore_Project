import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TiDeleteOutline } from "react-icons/ti";
import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import Header from "./Header";
import { createOrders } from "../config/MyService";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const [itemPresent, setItemPresent] = useState([]);

  let items = [];
  let total = [0];
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setItemPresent(cartItems);
  }, []);
  console.log(itemPresent);

  const onAdd = (product) => {
    const exist = itemPresent.find((item) => item._id === product._id);
    if (exist) {
      setItemPresent(
        itemPresent.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(itemPresent));
    } else {
      setItemPresent([...itemPresent, { ...product, quantity: 1 }]);
    }
    // window.location.reload(false);
  };

  const onRemove = (product) => {
    const exist = itemPresent.find((item) => item._id === product._id);
    if (exist.quantity === 1) {
    } else {
      setItemPresent(
        itemPresent.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(itemPresent));
    }
  };
  const onDelete = (index) => {
    let storage = JSON.parse(localStorage.getItem("mycart"));
    storage.splice(index, 1);
    console.log(storage);
    let setStore = JSON.stringify(storage);
    localStorage.setItem("mycart", setStore);
    setItemPresent(storage);
    window.location.reload(false);
  };

  const checkout = () => {
    console.log(itemPresent);

    itemPresent.map((value) => {
      let allorders = {
        product_name: `${value.name}`,
        product_cost: `${value.price}`,
        product_image: `${value.image}`,
        quantity: `${value.quantity} `,
      };
      items.push(allorders);
    });
    let email = localStorage.getItem("user");
    let orderno = Math.random().toFixed(6).split(".")[1];
    let tot = total.reduce((result, number) => result + number);
    localStorage.setItem("total", tot);
    let checkout = {
      email: email,
      items: items,
      orderno: orderno,
      total: total.reduce((result, number) => result + number),
    };
    console.log(checkout);

    createOrders(checkout).then((res) => {
      console.log(res.data);

      navigate("/checkout", {
        state: { orderno: orderno },
      });
    });
  };

  return (
    <div>
      <Header />

      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-md-8">
            <div className="cart">
              <table className="table" style={{ border: "3px solid black" }}>
                <thead>
                  <tr style={{ border: "3px solid black" }}>
                    <th>Sr.No</th>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ fontWeight: "620" }}>
                  {itemPresent
                    ? itemPresent.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div>
                                <img
                                  style={{ border: "2px solid black" }}
                                  src={value.image}
                                  height="210px"
                                  width="220px"
                                />
                              </div>
                              {value.name}
                            </td>

                            <td>{value.price}</td>
                            <td>
                              <div className="row">
                                <div className="col">
                                  <GrFormSubtract
                                    size="20px"
                                    onClick={() => onRemove(value)}
                                  >
                                    {" "}
                                    SUBSTRACT
                                  </GrFormSubtract>
                                </div>
                                <div className="col">
                                  <input
                                    className="text-center"
                                    type="text"
                                    style={{
                                      border: "2px solid black",
                                      width: "100px",
                                    }}
                                    value={value.quantity}
                                  />
                                </div>
                                <div className="col">
                                  <GrFormAdd
                                    size="20px"
                                    onClick={() => onAdd(value)}
                                  >
                                    {" "}
                                    ADD
                                  </GrFormAdd>
                                </div>
                              </div>
                            </td>
                            <td>{value.quantity * value.price}</td>
                            <td>
                              <TiDeleteOutline
                                size="25px"
                                onClick={() => onDelete(index)}
                              />
                            </td>
                            {console.log(
                              total.push(value.price * value.quantity)
                            )}
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="col-md-4"
            style={{
              border: "3px solid black",
              height: "300px",
              width: "438px",
              borderRadius: "30px",
            }}
          >
            <div>
              <br />
              <h3>Summary</h3>
              <hr style={{ fontWeight: "600" }} />
              <div className="row">
                <div className="col-md-6">
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    Subtotal :{" "}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    GST(5%):{" "}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "red",
                      fontSize: "17px",
                    }}
                  >
                    Grand Total :{" "}
                  </p>
                </div>
                <div className="col-md-6">
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    ₹ {total.reduce((result, number) => result + number)}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "black",
                      fontSize: "15px",
                    }}
                  >
                    ₹ {0.05 * total.reduce((result, number) => result + number)}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "red",
                      fontSize: "17px",
                    }}
                  >
                    ₹
                    {total.reduce((result, number) => result + number) +
                      0.05 * total.reduce((result, number) => result + number)}
                  </p>
                </div>
              </div>

              <br />
              <button className="btn btn-primary" onClick={() => checkout()}>
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>

        <br />
      </div>
    </div>
  );
}
