import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "./redux/cart";
import { FaTrashAlt } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { cartProductApi ,cartDeleteApi} from "./cartApicall";

const Cart = () => {
  var User = JSON.parse(localStorage.getItem("token"));
  const userId = User?.data?._id;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const inc = (id) => {
  //   dispatch(cartAction.inc(id));
  // };

  // const dec = (id) => {
  //   dispatch(cartAction.dec(id));
  // };

  const deleteItem = (id) => {
    dispatch(cartAction.remove(id));
  };

  const deleteAll = (id) => {
    dispatch(cartAction.reset(id));
  };

  const [productCart, setProductCart] = useState();
  useEffect(() => {
    cartProductApi(userId).then((res) => setProductCart(res.data));
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
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              {/* <th>Quantity</th> */}
              <th>Action</th>
            </tr>
            {productCart === undefined ? (
              <h1>Loading...</h1>
            ) : (
              productCart?.data[0].products.map((product, index) => (
                <tr key={index} style={{ fontWeight: "bold", color: "white" }}>
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
                    {product.productPrice}
                  </td>

                  {console.log(product.productPrice)}
                   {/* <td>  */}
                    {/* <FaRupeeSign />
                    {parseFloat(product.productPrice) *
                      parseFloat(product.productPrice)} */}
                   {/* </td> 
                   {console.log(e.amount)} 
                   <td>  */}
                    {/* <button onClick={dec.bind(this, index)}>-</button>{" "}
                    {index.Quantity}{" "}
                    <button onClick={inc.bind(this, index)}>+</button>
                    
                  </td>  */}
                  <td>
                    <FaTrashAlt
                      className="trash"
                      onClick={deleteItem.bind(this, product.productId)}
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
            {console.log(cart)}
            Grand Total :{" "}
            {cart.reduce(
              (total,product)=> total + Number(product.productPrice) ,
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
