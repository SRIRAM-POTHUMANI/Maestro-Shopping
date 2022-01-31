import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";

import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <img
        src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-e-commerce-education-banner-background-image_186720.jpg"
        alt="ad"
        className="checkout_ad"
      />
      <h3>Hello, {user?.email}</h3>
      <div className="d-flex justify-content-start combined gap-5  mt-5">
        <div className="subtotalc ">
          <Subtotal />
        </div>
        <div class="corders mb-3 text-start">
          <h2 className="card-header">Your Shopping basket</h2>
          <div class="row row-cols-1 row-cols-md-1  gap-1 mt-2 mb-2  d-flex justify-content-evenly">
            {basket.map((item) => (
              <CheckoutProduct
                className="card"
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
