import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Product from "./Product";
import Carousel from "./Slidder";
// import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
function Home() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setproducts(res.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(currentProducts);
  return (
    <div className="home">
      <div className="home_container text-center align-item-center justify-content-center">
        <div className="home_image">
          <Carousel
            url1="https://m.media-amazon.com/images/I/61mX4+tcVdL._SX3000_.jpg"
            url2="https://m.media-amazon.com/images/I/61qK1Xm3ROL._SX3000_.jpg"
            url3="https://m.media-amazon.com/images/I/71kb+pV0lGL._SX3000_.jpg"
            url4="https://m.media-amazon.com/images/I/71i723QTb+L._SX3000_.jpg"
            url5="https://m.media-amazon.com/images/I/610zaYNI4OL._SX3000_.jpg"
          />
        </div>
        <div>
          <div class="row row-cols-1 row-cols-md-3 g-4 m-3 d-flex d-flex justify-content-evenly">
            {currentProducts.map((item) => {
              return (
                <div key={item.id} className="col">
                  <Product
                    id="12321341"
                    title={item.title}
                    desc={item.description}
                    price={item.price}
                    rating={item.rating.rate}
                    image={item.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {loading ? (
          <HourglassEmptyIcon />
        ) : (
          <Pagination
            class="d-flex justify-content-center"
            productsPerPage={productsPerPage}
            totalproducts={products.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
