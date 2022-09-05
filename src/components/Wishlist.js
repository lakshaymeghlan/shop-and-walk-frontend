import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAction } from "./redux/wishlist_redux";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useParams } from "react-router";
import { wishlistProductApi } from "./wishlistApiCall";

const Wishlist = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  // const userId = User?.data?._id;
  const userEmail = User?.data?.email;


  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(wishlistAction.remove(id));
  };

  const deleteAll = (id) => {
    dispatch(wishlistAction.reset(id));
  };

  const [productWishlist, setProductWishlist] = useState();
  useEffect(() => {
    wishlistProductApi(userEmail).then((res) => setProductWishlist(res.data));
   
  }, []);

  const { product_id } = useParams();
  console.log(product_id);

  return (
    <div div className="container">
      {wishlist.length !== 0 ? (
        <>
          <table
            style={{
              width: "100%",
              margin: "30px 0",
              borderCollapse: "collapse",
            }}
          >
            <tr style={{ fontWeight: "bold", color: "white" }}>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>

              {/* <th>Action</th> */}
            </tr>

            {productWishlist === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productWishlist.data.map((product, index) => (
                // {wishlist.map((e, index) => {

                <tr key={index} style={{ fontWeight: "bold", color: "white" }}>
                  <td>{index}</td>
                  <td>{product.productName}</td>

                  <td>
                    <FaRupeeSign />
                    {product.productPrice}
                  </td>

                  <td>
                    <FaTrashAlt
                      className="trash"
                      onClick={deleteItem.bind(this, product.id)}
                    ></FaTrashAlt>
                  </td>
                </tr>
              ))
            )}
          </table>
          <button onClick={deleteAll}>Remove All</button>
        </>
      ) : (
        <p style={{ fontWeight: "bold", color: "white" }}>Empty Wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
