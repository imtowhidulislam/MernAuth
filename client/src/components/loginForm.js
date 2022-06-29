import React, { useState, useEffect } from "react";
import axios from "axios";
import registration from "../style/registration.css";
import { Link } from "react-router-dom";

const Form = () => {
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    // const id = new Date().getTime().toString();
    setFormUser({ ...formUser, [name]: value });
  };

  const url = "http://localhost:3001/api/user/login/";
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const { password, email } = formUser;
    if (password && email) {
      try {
        const response = await axios.post(url, { email, password });
        localStorage.setItem("token", response.data);
        window.location = "/";
        // const data = await response.json();
        console.log(response.data);
        setFormUser({ email: "", password: "" });
      } catch (err) {
        console.log(`${err.message} 🐛🐛`);
      }
    } else console.log("Enter input for all feild");
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin} className="formStyle">
        <h2 className="form_title">Login From</h2>
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
          onClick={handleSubmitLogin}
        >
          Submit
        </button>
        <Link to="/RegisterForm">
          <button type="button">sign up</button>
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

export default Form;
