const express = require("express");
const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();
const { UserModel, TodoModel, ProjectModel } = require("../database/db");

router.use(express.json());

// todo Routes
router.post("/createProject", adminMiddleware, async (req, res) => {
  await ProjectModel.create({
    title: req.body.title,
    userId: userId,
  });
  res.json({
    message: "Project created successfully",
  });
});

// todo Routes
router.post("/todo", adminMiddleware, async (req, res) => {
  const todoType = req.body.todoType;
  await TodoModel.insert({
    todoId: todos.todoType.length + 1,
    content: req.body.content,
  });
  res.json({
    message: "Todo created successfully",
  });
});

router.put("/", adminMiddleware, (req, res) => {
  // Implement update todo logic
});

router.delete("/", adminMiddleware, (req, res) => {
  // Implement delete todo logic
});

router.delete("/:id", adminMiddleware, (req, res) => {
  // Implement delete todo by id logic
});

router.get("/projects", adminMiddleware, (req, res) => {
  res.json({
    projects: ["{Project 1}", "Project 2", "Project 3"],
  });
});

router.get("/:id", adminMiddleware, (req, res) => {
  // Implement fetching todo by id logic
});

module.exports = router;
