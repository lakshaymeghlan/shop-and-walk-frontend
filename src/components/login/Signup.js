import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  // MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory()

  async function signUp() {
    console.warn(name, email, password);
    let item = { name, email, password };

    let result = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
      },
    })
    //  setName("");
    //   setEmail("");
    //   setPassword("");
      
      .then((data) => {
        console.log(data, "register successful");
        if (data.statusText == "OK") {
          console.log("lakshay")
          alert("register successful");
          window.localStorage.setItem("token", JSON.stringify({ ...data }));
          setName("");
          setEmail("");
          setPassword("");
          window.location.href = "./login";
        } else {
          alert("register credentials are incorrect");
        }
      });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
  }

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="signup_1">
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 head">
                Sign up
              </p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Your Name"
                  id="form1"
                  type="text"
                  className="w-100"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Your Email"
                  id="form2"
                  type="email"
                />
              </div>

              <div
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="d-flex flex-row align-items-center mb-4"
              >
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="form3"
                  type="password"
                />
              </div>

              <div className="mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
              </div>

              <button onClick={signUp} className="mb-4 button_rev" size="lg">
                Register
              </button>

              <h6 className="mb-4">
                Already Register ? <Link to="/Login">Login</Link>
              </h6>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://c0.wallpaperflare.com/preview/37/157/160/unpaired-teal-air-jordan-1-shoe.jpg"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
