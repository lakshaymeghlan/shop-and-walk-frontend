import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// function logout(){
//   localStorage.clear();
//   Navigate("/login")
// }
const UserDetails = () => {

  const [userName ,setUserName] = useState('')
  const [userEmail ,setUserEmail] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
    var tokenData = window.localStorage.getItem("token")
    if(JSON.parse(tokenData)){
    fetch("http://localhost:8080/auth/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: JSON.parse(tokenData).data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userData");
        setUserName(data.data.name);
        setUserEmail(data.data.email)
      });
  }
}, [])
    
    return (
      <div className="container">
      <div className="user_det">
        Name<h1>{userName}</h1>
        Email <h1>{userEmail}</h1>

        <button className="button_rev" onClick={()=>{localStorage.clear();
  navigate("/login")}}>logout</button>
      </div>
      </div>
    );
}

export default UserDetails;

