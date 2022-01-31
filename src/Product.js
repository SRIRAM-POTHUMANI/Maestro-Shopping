import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, image, rating, desc }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div class="card h-100 m-auto border-dark">
      <div className="text-center">
        <img src={image} class="card-img-top productimg" alt="..." />
      </div>
      <div class="card-body">
        <h5 class="card-title fs-367">{title}</h5>
        <h6>{truncate(desc, 100)}</h6>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        <h6>
          <small>Rs - </small>
          <strong>{price}</strong>
        </h6>
      </div>
      <div class=" text-center">
        <button
          class="btn w-100"
          onClick={addToBasket}
          // style={{ color: "#cd9042" }}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
