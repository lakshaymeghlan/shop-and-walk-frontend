import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAction } from "./redux/wishlist_redux";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { wishlistProductApi, wishlistDeleteApi } from "./wishlistApiCall";

const Wishlist = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User?.data?._id;

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
    wishlistProductApi(userId).then((res) => setProductWishlist(res.data));
  }, []);

  // add and delete checkbox item in component part
  const [deleteProducts, setDeleteProducts] = useState([]);
  const addProductToDeleteList = (product) => {
    let exists = deleteProducts.find(
      (currentProduct) => currentProduct._id === product._id
    );
    if (exists) {
      let products = deleteProducts.filter((currentProduct) => {
        return product._id != currentProduct._id;
      });
      setDeleteProducts(Array.from(new Set(products)));
    } else {
      setDeleteProducts(Array.from(new Set([...deleteProducts, product])));
    }
  };

  const deleteCheckbox = () => {
    deleteProducts.map((product) => {
      wishlistDeleteApi(userId, product._id);
    });
  };

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
              productWishlist?.data.products.map((product, index) => (

                <tr key={index} style={{ fontWeight: "bold", color: "white" }}>
                  <td>
                    {" "}
                    <input
                      onChange={() => {
                        addProductToDeleteList(product);
                      }}
                      type="checkbox"
                    />{" "}
                    {index}
                  </td>
                  <td>{product.productName}</td>

                  <td>
                    <FaRupeeSign />
                    {product.productPrice}
                  </td>

                  <td>
                    <FaTrashAlt
                      className="trash"
                      onClick={deleteItem.bind(this, product.productId)}
                    ></FaTrashAlt>
                  </td>
                </tr>
              ))
            )}
          </table>
          <button onClick={deleteAll}>Remove All</button>

          {/* TODO @lakshay button should be visible only when item is checked and vice versa */}
          <button onClick={deleteCheckbox}>Remove Selected</button>
        </>
      ) : (
        <p style={{ fontWeight: "bold", color: "white" }}>Empty Wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
