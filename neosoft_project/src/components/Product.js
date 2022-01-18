import React, { useEffect, useState } from "react";
import { FetchingProduct } from "../config/MyService";
import Footer from "./Footer";
import Header from "./Header";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { StarsRating } from "stars-rating-react-hooks";
import { BiLike, BiDislike, BiCategoryAlt, BiColorFill } from "react-icons/bi";
import { MdOutlineCategory, MdOutlineColorLens } from "react-icons/md";

function Product(props) {
  const [postdata, setPostdata] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [temp, setTemp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postdata.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [selecting, setSelecting] = useState(null);
  const [showdata, setshowdata] = useState(1);

  const HighToLow = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost > postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };

  const LowToHigh = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost < postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };

  const singleitem = (id) => {
    console.log(id);
    navigate("/productdetails", {
      state: { id: id },
    });
  };
  const config = {
    totalStars: 5,
    initialSelectedValue: 4.5,
    renderFull: (
      <img
        src="https://media.istockphoto.com/vectors/yellow-star-icon-logo-vector-id1137310097?k=20&m=1137310097&s=170667a&w=0&h=tD2RgD0Gpk-4AOAPKZ_dz2E7eQMk0dUgoDFMaTGP-kk="
        height="25px"
      />
    ),
    renderEmpty: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1200px-Five-pointed_star.svg.png"
        height="20px"
      />
    ),
  };

  useEffect(() => {
    FetchingProduct().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      console.log(res.data.product);
    });
  }, []);
  console.log(postdata);

  const CategoryFilter = (value) => {
    const output = temp.filter((currentproduct) => {
      return currentproduct.category_id.category_name === value;
    });

    setPostdata(output);
  };

  const ColorFilter = (value) => {
    const output = postdata.filter((currentproduct) => {
      return currentproduct.color_id.color_name === value;
    });
    setPostdata(output);
  };

  const FetchAllProduct = () => {
    FetchingProduct().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      setTemp(res.data.product);
    });
  };

  useEffect(() => {
    FetchAllProduct();
  }, []);
  console.log(postdata);

  const addtoCart = (obj) => {
    console.log(obj.name);
    let item = {
      name: obj.product_name,
      price: obj.product_cost,
      _id: obj._id,
      image: obj.product_image,
      des: obj.product_desc,
      quantity: 1,
    };
    if (localStorage.getItem("mycart") !== null) {
      let arr = JSON.parse(localStorage.getItem("mycart"));
      let idArrays = [];
      arr.forEach((data) => {
        idArrays.push(data._id);
      });

      if (idArrays.includes(obj._id)) {
        alert("Product Already Added");
      } else {
        arr.push(item);
        localStorage.setItem("mycart", JSON.stringify(arr));
        alert("Product Added to Cart");
        window.location.reload(false);
      }
    } else {
      let arr = [];
      arr.push(item);
      localStorage.setItem("mycart", JSON.stringify(arr));
      alert("Product Added to Cart");
    }
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 mt-5">
            <br />
            <br />

            <h5>Filter</h5>

            <br />
            <div className="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <BiCategoryAlt size={"20px"} />
                &nbsp; Category
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() => CategoryFilter("Men")}>
                  Men
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => CategoryFilter("Women")}
                >
                  Women
                </a>
                <a class="dropdown-item" onClick={() => CategoryFilter("Kids")}>
                  Kids
                </a>
                <a class="dropdown-item" onClick={() => CategoryFilter("Home")}>
                  Home
                </a>
              </div>
            </div>

            <br />
            <div className="dropdown">
              <button
                class="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <MdOutlineColorLens size={"20px"} />
                &nbsp; Color
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() => ColorFilter("black")}>
                  Black
                </a>
                <a class="dropdown-item" onClick={() => ColorFilter("yellow")}>
                  Yellow
                </a>
                <a class="dropdown-item" onClick={() => ColorFilter("blue")}>
                  Blue
                </a>
                <a class="dropdown-item" onClick={() => ColorFilter("red")}>
                  Red
                </a>
                <a class="dropdown-item" onClick={() => ColorFilter("white")}>
                  White
                </a>
              </div>
            </div>
          </div>
          <br />
          <div className="col-md-10 productsearch">
            <input
              type="text"
              class="form-control"
              placeholder="Search product here!"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <br />
            <div className="row" style={{ border: "1px solid black" }}>
              <div className="col-lg-4  ">
                <button className="btn btn-primary" onClick={HighToLow}>
                  {" "}
                  Low to High
                </button>
              </div>
              <div className="col-lg-8  ">
                <button className="btn btn-primary" onClick={LowToHigh}>
                  High to Low
                </button>
              </div>
            </div>
            <br />
            <div className=" row">
              {postdata
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.product_name
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val, index) => (
                  <div className="col-md-3 product">
                    <div>
                      <img
                        src={val.product_image}
                        className="card-img-top"
                        alt="..."
                        height="250px"
                        onClick={() => singleitem(val._id)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          onClick={() => singleitem(val._id)}
                        >
                          {val.product_name}
                        </h5>
                        <hr />
                        <h6 className="card-text">Price: {val.product_cost}</h6>

                        <h6 className="card-text">
                          Material : {val.product_material}
                        </h6>
                        <h6 className="card-text">
                          Dimension:{val.product_dimension}
                        </h6>

                        <div>
                          <StarsRating
                            onStarsRated={(value) => {
                              alert(` You rated this product ${value}`);
                            }}
                            onSelecting={(isSelecting, selectingValue) => {
                              setSelecting({ isSelecting, selectingValue });
                            }}
                            config={config}
                          />
                        </div>

                        <br />
                        <button class="add" onClick={() => addtoCart(val)}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="container bg-light ">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={postdata.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Product;
