import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "./redux/cart";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { cartProductApi, cartDeleteApi, updateCart } from "./cartApicall";
// import { useParams } from "react-router-dom";

// const params = useParams()
const Cart = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User?.user?._id;

  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const dispatch = useDispatch();

  const deleteAll = (id) => {
    dispatch(cartAction.reset(id));
  };

  const [productCart, setProductCart] = useState();
  useEffect(() => {
    cartProductApi(userId).then((res) => {
      setProductCart(res.data);
      console.log("-++++++++>", res.data);
    });
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
      cartDeleteApi(userId, product._id);
    });
  };

  const delete_product = (id) => {
    cartDeleteApi(productCart?.data[0]._id, id).then((resp) => {
      if (resp) cartProductApi(userId).then((res) => setProductCart(res.data));
    });
  };

  //    const [existedProducts, setexistedProducts] = useState([]);
  //    const ProductTexistedList = (product) => {
  //    let grandTotal = Array.find(
  //     (currentProduct) => currentProduct._id === product._id
  //    );
  //    if (exists) {
  //     let products = deleteProducts.filter((currentProduct) => {
  //       return product._id != currentProduct._id;
  //     });
  //     setDeleteProducts(Array.from(new Set(products)));
  //   } else {
  //     setDeleteProducts(Array.from(new Set([...deleteProducts, product])));
  //   }
  // };

  // const [quantity, setQuantity] = useState(1);

  const handleClick1 = (id, quantity) => {
    // setQuantity((prevCount) => prevCount - 1);
    if (quantity === 1) {
      cartDeleteApi(productCart?.data[0]._id, id).then((resp) => {
        if (resp)
          cartProductApi(userId).then((res) => setProductCart(res.data));
      });
    } else {
      updateCart(productCart?.data[0]._id, id, { quantity: quantity - 1 });
    }

    cartProductApi(userId).then((res) => {
      setProductCart(res.data);
      console.log("-++++++++>", res.data);
    });
  };

  const handleClick = (id, quantity) => {
    // setQuantity((prevCount) => prevCount + 1);
    // updateCart(params.id,{"quantity":quantity})
    updateCart(productCart?.data[0]._id, id, { quantity: quantity + 1 });
    cartProductApi(userId).then((res) => {
      setProductCart(res.data);
      console.log("-++++++++>", res.data);
    });
  };

  let total = 0

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
            <tbody>
              <tr style={{ fontWeight: "bold", color: "white" }}>
                {/* <th>Id</th> */}
                <th></th>
                <th>id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
              {productCart === undefined ? (
                <h1>Loading...</h1>
              ) : (
                productCart?.data[0].products.map((product, index) => (
                  total = total + parseInt(product.productPrice)* product.quantity,
                  <tr
                    key={index}
                    style={{ fontWeight: "bold", color: "white" }}
                  >
                    <input
                      onChange={() => {
                        addProductToDeleteList(product);
                      }}
                      type="checkbox"
                    />
                    <td>{index}</td>
                    <td>{product.productName}</td>

                    <td>
                      <FaRupeeSign />
                      {product.productPrice * product.quantity}
                    </td>

                    {console.log(product.productPrice)}

                    <button
                      className="control__btn"
                      onClick={() => handleClick(product._id, product.quantity)}
                    >
                      +
                    </button>

                    {product.quantity}
                    <button
                      className="control__btn"
                      onClick={() =>
                        handleClick1(product._id, product.quantity)
                      }
                    >
                      -
                    </button>
                    <td>
                      <FaTrashAlt
                        className="trash"
                        type="submit"
                        onClick={() => delete_product(product._id)}
                      ></FaTrashAlt>
                    </td>
                  </tr>
                  // </div>
                ))
              )}
            </tbody>
          </table>

          <button onClick={deleteAll}>Remove All</button>
          <button onClick={deleteCheckbox}>Remove CHECKBOX</button>

          <h3 style={{ fontWeight: "bold", color: "white" }}>
            {/* {console.log(cart)} */}
            Grand Total :{" "}{total}
            {/* {cart.reduce(
              (total, product) =>
                total + parseInt(product.productPrice) * product.quantity,
              0
            )} */}
          </h3>
        </>
      ) : (
        <p style={{ fontWeight: "bold", color: "white" }}>Empty Cart</p>
      )}
    </div>
  );
};

export default Cart;
