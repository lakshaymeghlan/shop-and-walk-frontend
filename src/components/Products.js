// import Data from "../db";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import {  useSelector } from "react-redux";
// import { productAction } from "./redux/product_redux";
import productApiCall from "./productApiCall";
// import imageApi from "./imageApi";

function Products() {
  const [productList, setProductList] = useState();
  useEffect(() => {
    // imageApi().then((res) => {
    //   console.log(res.data)

    // });

    productApiCall().then((res) => {
      // console.log(res.data)
      setProductList(res.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="second_head">PRODUCTS</h1>
        <div className="app col-10 mx-auto col-md-6 col-lg-3 my-3">
          <div className="products ">
            {productList === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productList.data.map((product) => {
                return (
                  <div key={product._id}>
                    <Link to={`/products_details/${product._id}`}>
                      <h4 className="anchor_cls ">{product.productName}</h4>
                    </Link>
                    <img
                      className="img_product"
                      src={product.img}
                      alt={product.productName}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
