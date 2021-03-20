import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [regUserName, setRegUserName] = useState("");
  const [regUserId, setRegUserID] = useState("");
  const [regUserPassword, setRegUserPassword] = useState("");
  const [regType, setType] = useState("");

  const register = (e) => {
    e.preventDefault();

    alert("Register Successfully");
    setRegUserName("");
    setRegUserID("");
    setRegUserPassword("");
    setType("");

    axios
      .post("http://localhost:5000/register", {
        userName: regUserName,
        userId: regUserId,
        userPassword: regUserPassword,
        userType: regType,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="right">
      <h1>Register</h1>
      <form>
        <div className="card">
          <input
            type="text"
            name="userName"
            value={regUserName}
            onChange={(e) => setRegUserName(e.target.value)}
            placeholder="User Name"
            required
          />
        </div>

        <div className="card">
          <input
            type="text"
            name="userId"
            value={regUserId}
            onChange={(e) => setRegUserID(e.target.value)}
            placeholder="User Id"
            required
          />
        </div>

        <div className="card">
          <input
            type="password"
            name="userPassword"
            value={regUserPassword}
            onChange={(e) => setRegUserPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div
          className="card"
          onChange={(e) => setType(e.target.value)}
          required
        >
          <input type="radio" value="customer" name="userType" />
          Customer
          <br />
          <input type="radio" value="banker" name="userType" />
          Banker
        </div>

        <button type="submit" className="registerbtn" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
