import React from "react";
import "./Header.css";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import logo from "./maestro-logo.png";
import { auth } from "./firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top justify-content-between">
      <div class="container-fluid ">
        <Link to="/">
          <img className="header_logo navbar-brand" src={logo} alt="logo" />
        </Link>
        <Link to="/checkout">
          <div className="header_optionbasket ms-2 justify-content-start d-flex align-items-center">
            <ShoppingCartIcon />
            <span className="header_optionline2 header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>

        <div
          class="navbar-toggler justify-content-end"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ outlineWidth: "none" }}
        >
          <span class="navbar-toggler-icon"></span>
        </div>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <div className="drophome">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 row">
              <li class="nav-item col">
                <Link to={!user && "/login"}>
                  <div
                    className="header_option nav-link justifly-content-center"
                    onClick={handleAuthenticaton}
                  >
                    <PersonIcon className="header_optionline1 me-1" />

                    <span className="header_optionline2">
                      {user ? "Sign Out" : "Sign - In"}
                    </span>
                  </div>
                </Link>
              </li>
              <li class="nav-item col">
                <Link to="/orders">
                  <div className="header_option nav-link">
                    <span className="header_optionline2">
                      <ListAltOutlinedIcon className="me-1" />
                      Orders
                    </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          
        </div>
      </div>
    </nav>
  );
}

export default Header;
