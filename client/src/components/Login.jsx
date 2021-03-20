import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginUser, setLoginUser] = useState("");
  const [loginUserPassword, setLoginUserPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        username: loginUser,
        password: loginUserPassword,
      })
      .then((response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", response.data.token);
          setLoginStatus(true);
        }
      });
  };

  const userAunthenticated = () => {
    axios
      .get("http://localhost:5000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="left">
      <h1>Login</h1>

      <div className="card">
        <input
          type="text"
          name="username"
          onChange={(e) => setLoginUser(e.target.value)}
          placeholder="User Id"
        />
      </div>

      <div className="card">
        <input
          type="password"
          name="password"
          onChange={(e) => setLoginUserPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <button type="submit" className="registerbtn" onClick={login}>
        Register
      </button>
      {loginStatus && (
        <button onClick={userAunthenticated}>check if authenticate</button>
      )}
    </div>
  );
};

export default Login;
