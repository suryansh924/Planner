const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define schemas
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  // Schema definition here
  email: String,
  password: String,
  name: String,
});

const projects = new Schema({
  // Schema definition here
  title: String,
  userId: ObjectId,
});

const Todo = new Schema({
  // Schema definition here
  title: String,
  done: Boolean,
  projectId: ObjectId,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);
const ProjectModel = mongoose.model("projects", projects);

module.exports = {
  UserModel,
  TodoModel,
  ProjectModel,
};
