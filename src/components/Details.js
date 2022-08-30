// import Data from "../db.json";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "./redux/cart";
import { wishlistAction } from "./redux/wishlist_redux";
import { FaRegHeart } from "react-icons/fa";
import productApiCall from "./productApiCall";
import { useParams } from "react-router";
import { wishlistSaveApi } from "./wishlistApiCall";
import { cartSaveApiCall } from "./cartApicall";

const Details = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User?.data?._id;

  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    productApiCall().then((res) => {
      setProductDetails(res.data);
    });
  }, []);

  //////////////////////////////////////////////////////////
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCart = (product) => {
    const isAdded = cart.some((id) => {
      return id === product.id;
    });
    
    if (!isAdded) {
      cartSaveApiCall({id: product.productId,
        name: product.productName,
        price: product.productPrice,
        amount: 1,
        userId: userId,})
      dispatch(

        cartAction.add({
          id: product.id,
          name: product.name,
          price: product.price,
          amount: 1,
          userId: userId,
        })
      );
    } else {
      alert("Already Added");
    }
  };

  //wishlist
  const wishlist = useSelector((state) => state.wishlist);
  const addToWishlist = (product) => {
    wishlistSaveApi({
      id: product.id,
      name: product.name,
      price: product.price,
      amount: 1,
      userId: userId,
    });

    console.log(product["id"], product["name"], product["price"]);
    const isAdded = wishlist.some((id) => {
      return id === product.id;
    });

    if (!isAdded) {
      dispatch(
        wishlistAction.add({
          id: product.id,
          name: product.name,
          price: product.price,
          amount: 1,
        })
      );
    } else {
      alert("Already Added");
    }
  };

  const { product_id } = useParams();
  console.log(product_id);
  return (
    <>
      <div className="container">
        <h1 className="second_head">PRODUCTS DETAILS</h1>
        <div className="app col-10 mx-auto col-md-6 col-lg-3 my-3">
          <div className="products">
            {productDetails === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productDetails.data
                .filter((product) => product._id === product_id)
                .map((productDetails) => (
                  <div key={productDetails._id}>
                    <h3>{productDetails.productName}</h3>
                    <p>{productDetails.productDesc}</p>
                    {/* <img src={productDetails.large} alt={productDetails.name} /> */}
                    <h2>{productDetails.productPrice}</h2>
                    <Link to="/cart">
                      <button
                        className="sign_up"
                        onClick={addToCart.bind(this, productDetails)}
                      >
                        Buy Now
                      </button>
                    </Link>
                    <Link to="/Wishlist">
                      <FaRegHeart
                        size={20}
                        className="whislist"
                        onClick={addToWishlist.bind(this, productDetails)}
                      ></FaRegHeart>
                    </Link>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
