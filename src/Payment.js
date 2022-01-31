import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const [address, setaddress] = useState("");

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user?.uid);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            address: address ? address : "Not Available",
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <form onSubmit={handleSubmit} className="payment__container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        {/* Payment section - delivery address */}
        <div className="d-flex justify-content-start combined gap-2 payment__section">
          <div className="payment__title">
            <h3>Delivery Details</h3>
          </div>
          <div class="corders text-start">
            <div class="form-floating" style={{ maxWidth: "500px" }}>
              <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                required
                style={{ height: "100px" }}
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              ></textarea>
              <label for="floatingTextarea">Address</label>
            </div>
          </div>
        </div>
        {/* Payment section - Review Items */}
        <div className="d-flex justify-content-start combined gap-2 payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div class="corders mb-3 text-start">
            <div class="payment__items row row-cols-1 row-cols-md-1  gap-3 mb-2  d-flex justify-content-start">
              {basket.map((item) => (
                <CheckoutProduct
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
        {/* Payment section - Payment method */}
        <div className="d-flex justify-content-start combined gap-2 payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div class="corders mb-3 text-start  m-2">
            <div class="form-floating" style={{ maxWidth: "400px" }}>
              {/* Stripe magic will go */}

              <div className="card p-3 gap-2">
                <CardElement
                  onChange={handleChange}
                  className="card card-header"
                />
                <p className="text-start ms-3 mt-3 text-secondary lh-sm">
                  Use dummy card details given below: <br />
                  Card Number- 4242 4242 4242 4242 <br />
                  MM/YY - 02/24
                  <br />
                  CVC - 242
                  <br />
                  ZIP - 42424
                </p>
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={0}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>

                {/* Errors */}
                {error && <div>{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
