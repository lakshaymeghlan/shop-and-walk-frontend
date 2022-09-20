import React, { Component } from "react";
import {Link} from 'react-router-dom'


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
      }),
      
    })
      .then((res) => res.json())
      
      .then((data) => {
        console.log(data, "userRegister");
      });
      if(this.state != " "){
        this.setState({fname : " "});
        console.log(this.state.fname)
      }
      
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <h3 className="log_in">Sign Up</h3>

        <div className="mb-3">
          <label className="log_in">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="log_in">Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => this.setState({ lname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="log_in">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="log_in">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right log_in">
          Already registered <Link to="/Login"><button className="sign_up">sign in?</button></Link>
        </p>
      </form>
      </div>
    );
  }
}
