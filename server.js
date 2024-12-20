const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

app.use(express.static("public"));

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const todoRoutes = require("./routes/todo");
app.use("/api/todo", todoRoutes);

//  start writing your routes here

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
