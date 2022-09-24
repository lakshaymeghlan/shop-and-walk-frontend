import axios from "axios";

export const cartApiCall = async () => {
  const cartApiCall = await axios
    .get("http://localhost:8080/cart/cart")
    .then((res) => {
      return res;
    });
  return cartApiCall;
};

export const cartSaveApiCall = async (data) => {
  const cartApiCall = await axios
    .post("http://localhost:8080/cart/addToCart", data)
    .then(res => {
      return res;
    });
  return cartApiCall;
};

export const cartProductApi = async (userId) => {
  const cartProductApi = await axios
    .get(`http://localhost:8080/cart/cartProduct/${userId}`)
    .then(res => {
      return res;
    });
  return cartProductApi;
};

export const cartDeleteApi = async (cartId, productId) => {
  const cartDeleteApi = await axios
    .delete(
      `http://localhost:8080/cart/delete/${cartId}/product/${productId}`)
    .then((res) => {
      return res;
    });
  return cartDeleteApi;
};
