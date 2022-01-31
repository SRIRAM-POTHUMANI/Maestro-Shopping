import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div class="card mb-2 gap-1">
      <div className="text-center">
        <img src={image} class="card-img-top productimg" alt="..." />
      </div>
      <div class="card-body  text-start">
        <h5 class="card-title">{title}</h5>
        <div className="checkoutProduct__rating">
          {Array(Math.ceil(rating))
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <p>
          <small>₹</small>
          <strong>{Math.ceil(price)}</strong>
        </p>
        {!hideButton && (
          <button onClick={removeFromBasket} class="justify-content-center">
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
