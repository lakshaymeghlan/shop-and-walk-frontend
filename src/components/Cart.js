import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "./redux/cart";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { cartProductApi } from "./cartApicall";
import { useParams } from "react-router";

const Cart = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User.data._id;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const inc = (id) => {
    dispatch(cartAction.inc(id));
  };

  const dec = (id) => {
    dispatch(cartAction.dec(id));
  };

  const deleteItem = (id) => {
    dispatch(cartAction.remove(id));
  };

  const deleteAll = (id) => {
    dispatch(cartAction.reset(id));
  };

  const [productCart, setProductCart] = useState();
  useEffect(() => {
    cartProductApi(userId).then((res) => setProductCart(res));
  }, []);

  const { product_id } = useParams();
  console.log(product_id);

  return (
    <div div className="container">
      {cart.length !== 0 ? (
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
              <th>Total Price</th>
              <th>Amount</th>
              {/* <th>Action</th> */}
            </tr>

            {productCart === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productCart.data.getProduct.map((product, index) => (
                // <div key={cart}>
                <tr key={index} style={{ fontWeight: "bold", color: "white" }}>
                  <td>{index}</td>
                  <td>{product.productName}</td>

                  <td>
                    <FaRupeeSign />
                    {product.productPrice}
                  </td>

                  <td>
                    <FaRupeeSign />
                    {parseFloat(product.productPrice) *
                      parseFloat(product.productPrice)}
                  </td>
                  {/* {console.log(e.amount)} */}
                  <td>
                    <button onClick={dec.bind(this, index)}>-</button>{" "}
                    {index.amount}{" "}
                    <button onClick={inc.bind(this, index)}>+</button>
                  </td>
                  <td>
                    <FaTrashAlt
                      className="trash"
                      onClick={deleteItem.bind(this, product.id)}
                    ></FaTrashAlt>
                  </td>
                </tr>
                // </div>
              ))
            )}
          </table>
          <button onClick={deleteAll}>Remove All</button>
          <h3 style={{ fontWeight: "bold", color: "white" }}>
            Grand Total :{" "}
            {cart.reduce(
              (product, item) => product + item.price * item.amount,
              0
            )}
          </h3>
        </>
      ) : (
        <p style={{ fontWeight: "bold", color: "white" }}>Empty Cart</p>
      )}
    </div>
  );
};

export default Cart;
