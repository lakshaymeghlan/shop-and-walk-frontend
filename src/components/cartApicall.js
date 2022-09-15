import axios from "axios";

export const cartApiCall = async () => {
  const cartApiCall = await axios
    .get("http://localhost:8080/cart/cart")
    .then((res) => {
      return res;
    });
  return cartApiCall;
};


export const cartSaveApiCall = async (product) => {
  const cartApiCall = await axios
    .post("http://localhost:8080/cart/addToCart",product)
    .then(console.log(product)
    );
  return cartApiCall;
};

export const cartProductApi = async (userId,productId) => {
  const cartProductApi = await axios
    .get(`http://localhost:8080/cartProduct/delete/${userId}/products/${productId}}`)
    .then((res)=>{return(res)});
  return cartProductApi;
};
