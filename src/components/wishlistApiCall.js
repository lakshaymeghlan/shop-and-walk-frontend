import axios from "axios";

export const wishlistApiCall = async () => {
  const wishlistCall = await axios
    .get("http://localhost:8080/wishlist/wishlist")
    .then((res) => {
      return res;
    });
  return wishlistCall;
};

export const wishlistSaveApi = async (product) => {
  console.log(product);
  const wishlistCall = await axios
    .post("http://localhost:8080/wishlist/create", product)
    .then(console.log(product));
  return wishlistCall;
};

export const wishlistProductApi = async (userEmail) => {
    const wishlistProductApi = await axios
      .get(`http://localhost:8080/wishlist/wishlist/${userEmail}`)
      .then((res)=>{return(res)});
    return wishlistProductApi;
  };
