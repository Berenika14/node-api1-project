// BUILD YOUR SERVER HERE
const express = require("express");

const { find, findById, insert, update, remove } = require("./users/model");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//POST USERS
server.post("/api/users", (req, res) => {
  let body = req.body;

  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
  insert(body)
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

server.get("/api/users", (req, res) => {
  find().then((users) => {
    res
      .status(200)
      .json({ msg: users })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The users information could not be retrieved" });
      });
  });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  //   const id = req.params.id;

  findById(id)
    .then((user) => {
      res.status(200).json({ message: user });
    })
    .catch(() => {
      res
        .status(400)
        .json({ message: "The user with the specified ID does not exist" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ msg: `DELETE specific user 🤪 with an id ${id} ` });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ msg: `UPDATE specific user 😎 with an id ${id}` });
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
