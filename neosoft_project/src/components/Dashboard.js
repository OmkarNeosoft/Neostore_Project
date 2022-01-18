import React, { useEffect, useState } from "react";
import { FetchingProduct } from "../config/MyService";
import Footer from "./Footer";
import Header from "./Header";
import "./Style.css";

function Dashboard(props) {
  const [productdata, setProductData] = useState([]);
  const [search, setSearch] = useState("");

  const [temp, setTemp] = useState([]);
  const FetchAllProduct = () => {
    FetchingProduct().then((res) => {
      console.log(res.data);
      setProductData(res.data.product);
      setTemp(res.data.product);
    });
  };
  useEffect(() => {
    FetchAllProduct();
  }, []);
  console.log(productdata);

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container-fluid">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="images/1.jpg" class="d-block h-80 w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
            <div class="carousel-item">
              <img src="images/2.jpg" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
            <div class="carousel-item">
              <img src="images/3.jpg" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-target="#carouselExampleCaptions"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-target="#carouselExampleCaptions"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </button>
        </div>

        <br />
        <br />

        <h4 className="text-center"> Popular Products</h4>
        <br />
        <br />
        <div className="container-fluid">
          <div className=" row">
            {productdata
              .filter((itemvalue) => {
                if (search == "") {
                  return itemvalue;
                } else if (
                  itemvalue.product_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return itemvalue;
                }
              })
              .map((itemvalue, index) => (
                <div className="col-md-3">
                  <div class="center">
                    <div class="property-card">
                      <a href="#">
                        <div class="property-image">
                          <img
                            src={itemvalue.product_image}
                            className="card-img"
                            alt="..."
                            height="250px"
                          />
                          <div class="property-image-title">
                            <h5 className="card-title">
                              {itemvalue.product_name}
                            </h5>
                          </div>
                        </div>
                      </a>
                      <div class="property-description">
                        <h5 className="card-title">{itemvalue.product_desc}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Dashboard;
