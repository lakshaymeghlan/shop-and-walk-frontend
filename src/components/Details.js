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
  const userId = User?.user?._id;
  const userEmail = User?.user?.email;

  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    productApiCall().then((res) => {
      setProductDetails(res.data);
    });
  }, []);

  //////////////////////////////////////////////////////////
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCart = async (product) => {
    // const isAdded = cart.some((id) => {
    //   return id === product.id;
    // });
    let data = {
      userId: userId,
      userEmail: userEmail,
      products: [
        {
          id: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
        },
      ],
    };
    let resposnseData = await cartSaveApiCall(data);
    console.log("---------------->", resposnseData.data);

    const isAdded = cart.some((id) => {
      return id === product.id;
    });

    if (!isAdded) {
      // cartSaveApiCall({
      //   id: product.id,
      //   productName: product.name,
      //   productPrice: product.price,
      //   // amount: 1,
      //   // userId: userId,
      // });
      dispatch(
        cartAction.add({
          id: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
          // amount: 1,
          // userId: userId,
        })
      );
      productApiCall().then((res) => {
        setProductDetails(res.data);
      });
    } else {
      alert("Already Added");
    }
  };

  //wishlist
  const wishlist = useSelector((state) => state.wishlist);
  const addToWishlist = async (product) => {
    let data = {
      userId: userId,
      userEmail: userEmail,
      products: [
        {
          id: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
        },
      ],
    };
    let resposnseData = await wishlistSaveApi(data);
    console.log(resposnseData.data);

    const isAdded = wishlist.some((id) => {
      return id === product.id;
    });

    if (!isAdded) {
      dispatch(
        wishlistAction.add({
          id: product.productId,
          productName: product.productName,
          productPrice: product.productPrice,
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
                  <div key={productDetails.productId}>
                    <h3>{productDetails.productName}</h3>
                    <p>{productDetails.productDesc}</p>
                    {/* <img src={productDetails.large} alt={productDetails.name} /> */}

                    <img
                      className="prod_img "
                      src={productDetails.img}
                      alt={productDetails.productName}
                    />

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
