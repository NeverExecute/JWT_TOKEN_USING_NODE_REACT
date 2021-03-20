const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank",
});

//check connection
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySql Connected...");
  }
});

const app = express();
app.use(express.json());
app.use(cors());

//--------------------------------Create DB------------------------------------------------//
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE IF NOT EXISTS bank";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database Created...");
  });
});

//Create Tableuser_id
app.get("/createusertable", (req, res) => {
  let sql =
    "CREATE TABLE users(id int AUTO_INCREMENT, user_type VARCHAR(15), user_name VARCHAR(60), user_id VARCHAR(15), user_password VARCHAR(255), PRIMARY KEY(id) )";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("User Table Created..");
  });
});
//--Create Account Table

app.get("/createaccounttable", (req, res) => {
  let sql =
    "CREATE TABLE accounts(id int AUTO_INCREMENT, user_id VARCHAR(15), user_account_no int, acc_withdraw_date VARCHAR(30), acc_withdraw_amt FLOAT, acc_deposite_date VARCHAR(30), acc_deposite_amt FLOAT ,PRIMARY KEY(id) )";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Account Table Created..");
  });
});

//--------------------------------Create DB closed------------------------------------------------//

//------------------------------login/register using jws-------------------------------//

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const userId = req.body.userId;
  const userPassword = req.body.userPassword;
  const userType = req.body.userType;

  console.log(userName, userId, userPassword, userType);
  db.query(
    "INSERT INTO users (user_name, user_id, user_password, user_type) VALUES (?,?,?,?)",
    [userName, userId, userPassword, userType],
    (err, result) => {
      console.log(err);
    },
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE user_id = ? AND user_password = ? ",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        const id = result[0].id;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: 300,
        });
        res.json({ auth: true, token: token, result: result });
      } else {
        res.json({
          auth: false,
          message: "wrong username/password combination",
        });
      }
    },
  );
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("we need a token, please give token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you fail to authenticate" });
      } else {
        req.userId = decoded.user_id;
        next();
      }
    });
  }
};

app.get("/isuserauth", verifyJWT, (req, res) => {
  res.send("you are authenticated");
});

app.listen(5000, () => console.log("Server started on port 5000"));
