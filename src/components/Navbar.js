import React from "react";
import { Link } from "react-router-dom";
import photo from "../assest/cart.png";
import { FaHeart } from "react-icons/fa";
// import {useDispatch, useSelector} from 'react-redux'

const Navbar = () => {
// const userLogin = useSelector(state => state.userLogin)
// const {userInfo}

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg ">
        <div className="container">
          <a className="navbar-brand" href="/">
            SHOP
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-items">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="products" className="nav-items">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-items">
                  LogIn/SignUp
                </Link>
              </li>
            </ul>

            <Link to ="/Wishlist" className="nav-items">
            <FaHeart size={30} className="whislist_nav">
              {" "}
            </FaHeart>
            </Link>
            <form className="d-flex" role="search">
              {/* <Badge className="badge" badgeContent={4} color="primary" onclick ="" > */}
              <Link to="/cart" className="nav-items">
                <button className="btn" type="submit">
                  <img className="cart_img" src={photo} alt="img" />
                </button>
              </Link>

              {/* <ShoppingCartIcon></ShoppingCartIcon>
              </Badge> */}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
