import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import Product from "./Product";
// import Carousel from "./Slidder";
// import ReactPaginate from "react-paginate";
import Pagination from "./Pagination";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  const fetchComments = async (currentPage) => {
    await axios
      .get(
        "https://fakestoreapi.com/products?_page=${currentpage}&limit=${limit}"
      )
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
      });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="home_container">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
        {/* <div className="home_image">
          <Carousel
            url1="https://m.media-amazon.com/images/I/61mX4+tcVdL._SX3000_.jpg"
            url2="https://m.media-amazon.com/images/I/61qK1Xm3ROL._SX3000_.jpg"
            url3="https://m.media-amazon.com/images/I/71kb+pV0lGL._SX3000_.jpg"
            url4="https://m.media-amazon.com/images/I/71i723QTb+L._SX3000_.jpg"
            url5="https://m.media-amazon.com/images/I/610zaYNI4OL._SX3000_.jpg"
          />
        </div> */}
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
}

export default Home;
