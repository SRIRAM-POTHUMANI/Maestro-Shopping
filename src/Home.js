import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Product from "./Product";
// import Carousel from "./Slidder";
// import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setPosts(res.data);
      // setLoading(false);
  }});
  
  return (
    <div className="home">
      <div className="home_container">
        <div className="productsrow g-4">
          <div class="row row-cols-1 row-cols-md-3 g-4 m-3 d-flex d-flex justify-content-evenly">
            {posts.map((item) => {
              return (
                <div key={item.id} className="col">
                  <Product
                    id="12321341"
                    title={item.title}
                    desc={item.description}
                    price={item.price}
                    // rating={item.rating.rate}
                    image={item.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
