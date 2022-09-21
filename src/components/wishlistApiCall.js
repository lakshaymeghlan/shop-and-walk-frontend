import axios from "axios";

export const wishlistApiCall = async () => {
  const wishlistCall = await axios
    .get("http://localhost:8080/wishlist/wishlist")
    .then((res) => {
      return res;
    });
  return wishlistCall;
};

export const wishlistSaveApi = async (data) => {
  console.log(data);wishlistSaveApi
  const wishlistCall = await axios
    .post("http://localhost:8080/wishlist/create", data)
    .then(res => {
      return res; 
    });
  return wishlistCall;
};

export const wishlistProductApi = async (userId) => {
  const wishlistProductApi = await axios
    .get(`http://localhost:8080/wishlist/${userId}`)
    .then((res) => {
      return res;
    });
  return wishlistProductApi;
};

export const wishlistDeleteApi = async (userId,productId) => {
  const wishlistDeleteApi = await axios
    .delete(`http://localhost:8080/wishlist/delete/${userId}/products/${productId}`)
    .then((res) => {
      return res;
    });
  return wishlistDeleteApi;
};
