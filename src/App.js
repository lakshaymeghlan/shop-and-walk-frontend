import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/login/Login";
import SignUp from "./components/login/Signup";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Products from "./components/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Details from "./components/Details";
import UserDetails from "./components/login/UserDetails";
import Wishlist from "./components/Wishlist";

function App() {
  // useEffect( () => {
  //  (productApiCall())
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <Cart/> */}
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route path="/products_details/:product_id" element={<Details />} />
          <Route path="/userDetails" element={<UserDetails />} />
          {/* <Route path="/abcd" element={<productApiCall/>} /> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
