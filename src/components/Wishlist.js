import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wishlistAction } from "./redux/wishlist_redux";
import { FaRupeeSign } from "react-icons/fa";
import {
  wishlistProductApi,
  wishlistDeleteApi,
  wishlistDeleteProductApi,
  wishlistProductDeleteApi
} from "./wishlistApiCall";


const Wishlist = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User?.user?._id;

  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  console.log(wishlist)

  const deleteAll = (id) => {
    dispatch(wishlistAction.reset(id));
  };
  console.log(deleteAll)

  const [productWishlist, setProductWishlist] = useState();
  useEffect(() => {
    wishlistProductApi(userId).then((res) => setProductWishlist(res.data));
    // console.log(productWishlist)
  }, []);

  const delete_product = (id) => {
    wishlistDeleteApi(productWishlist?.data[0]._id, id).then((resp) => {
      if (resp)
        wishlistProductApi(userId).then((res) => setProductWishlist(res.data));
    });
  };

  // add and delete using checkbox

  const [deleteProducts, setDeleteProducts] = useState([]);
  const addProductToDeleteList = (product) => {
    let exists = deleteProducts.find(
      (currentProduct) => currentProduct === product._id
    );
    if (exists) {
      let products = deleteProducts.filter((currentProduct) => {
        return product._id != currentProduct;
      });
      setDeleteProducts(Array.from(new Set(products)));
    } else {
      setDeleteProducts(Array.from(new Set([...deleteProducts, product._id])));
    }
  };

  const deleteCheckbox = async () => {
    let result = await wishlistDeleteProductApi(userId, deleteProducts);
    if (result) {
      setProductWishlist(result.products);
    }
  };

  return (
    <div  className="container">
       {/* {wishlist.length !== 0 ? (  */}
        <div>
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
            </tr>

            {productWishlist === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productWishlist?.data[0].products.map((product, index) => (
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
                   
                    <button
                      type="submit"
                      onClick={() => delete_product(product._id)}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </table>
          {  productWishlist?.data[0].products.length > 0 ?<> <button className="button_rev" onClick={()=>(wishlistProductDeleteApi(productWishlist?.data[0]._id),window.location.reload())}>Remove All</button>

          <button className="button_rev" onClick={deleteCheckbox}>Remove Selected</button> </>: <h1>EMPTY CART</h1>}
        </div>
       
         {/* ) : (
            <p style={{ fontWeight: "bold", color: "white" }}>Empty Cart</p>
          )}  */}
    </div>
  );
};

export default Wishlist;
