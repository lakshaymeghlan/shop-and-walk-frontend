import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async ()=> {
    let item = { email, password };

    let result = await fetch("http://localhost:8080/auth/login-user", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "login successful");
      if (data.status == "ok") {
        alert("login successful");
        window.localStorage.setItem("token", JSON.stringify({ ...data}));
        // window.localStorage.setItem("user", JSON.stringify({ ...data}));
        setEmail("");
        setPassword("");
        window.location.href = "./userDetails";
      }else{
        alert("login credentials are incorrect")
      }
    })
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));   
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://w0.peakpx.com/wallpaper/947/764/HD-wallpaper-nike-air-ultra-aero-vector-art-artwork-illustrator-anime-shoe-shoes-wear-sportswear.jpg"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <h1 className=" white">Log In</h1>
          </div>

          <div className="divider d-flex align-items-center my-4"></div>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            size="lg"
          />

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn onClick={Login} className="mb-0 px-5 white" size="lg">
            Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2 white">
              Don&apos;t have an account? <Link to="/Signup">Register </Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
