import React, { useState, useEffect } from "react";
import axios from "axios";
import registration from "../style/registration.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./index";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const [user, setUser] = useState([]);
  const handleInput = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    const id = new Date().getTime().toString();
    console.log(id);
    setFormUser({ ...formUser, [name]: value });
  };
  // handleInput();
  // ? url : http://localhost:3001/api/user/;

  const url = "http://localhost:3001/api/user/register/";
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { username, password, email } = formUser;
    if (username && password && email) {
      try {
        const response = await axios.post(url, { username, email, password });
        // const data = await response.json();
        navigate("/LoginForm");
        console.log(response.data);

        setFormUser({ username: "", email: "", password: "" });
      } catch (err) {
        console.log(err.message);
      }
    } else console.log("Enter valid input");
  };

  return (
    <div>
      <form onSubmit={handleSubmitRegister} className="formStyle">
        <h2 className="form_title">Register From</h2>
        <input
          type="text"
          name="username"
          placeholder="enter your name"
          value={formUser.username}
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="enter your email"
          value={formUser.email}
          onChange={handleInput}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          value={formUser.password}
          onChange={handleInput}
        />
        <br />
        <button
          type="submit"
          style={{ cursor: "pointer" }}
          className="btn"
          onClick={handleSubmitRegister}
        >
          Submit
        </button>
        <br />
        <Link to="/LoginForm">
          <button type="button">sign in</button>
        </Link>
      </form>

      {/* TODO:: showing all users */}
      {/* <div className="user_container" style={{}}>
          {user.map((userOne) => {
          const { id, username, email, password } = userOne;
          return (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                // maxWidth: "25rem",
                gap: "2rem",
                textTransform: "capitalize",
                backgroundColor: "#f67f45",
                color: "#ffff",
                marginBottom: "1rem",
              }}
            >
              <p>{username}</p>
              <p>{email}</p>
              <p>{password}</p>
            </div>
          );
        })} 
      </div> */}
    </div>
  );
};

export default RegisterForm;
