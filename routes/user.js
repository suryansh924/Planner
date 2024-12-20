const express = require("express");
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const JWT_SECRET = process.env.JWT_SECRET;
const { UserModel, TodoModel, ProjectModel } = require("../database/db");

router.use(express.json());

// User Routes
router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const user = await UserModel.findOne({
    email: email,
  });

  if (user) {
    res.send({
      message: "Email already exists, Please enter other email!",
    });
  } else {
    UserModel.create({
      email: email,
      password: password,
      name: `${firstName} ${lastName}`,
    });
    res.json({
      message: "You are Signed In!",
    });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );
    // user.token = token;
    res.json({
      message: "Logged In successfully",
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid email or password",
    });
  }
});

router.get("/protected-endpoint", userMiddleware, (req, res) => {
  res.redirect("/home.html");
});

router.get("/todos", userMiddleware, (req, res) => {
  // Implement logic for getting todos for a user
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
});

module.exports = router;
