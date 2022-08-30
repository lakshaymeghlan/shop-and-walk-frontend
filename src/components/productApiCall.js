import axios from "axios";

const productApiCall = async () => {
  const productCall = await axios.get("http://localhost:8080/product/getProduct").then((res)=>{return res});
 return productCall;
};

export default productApiCall;
