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
  } else {
    insert(body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.get("/api/users", (req, res) => {
  find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

server.get("/api/users/:id/", (req, res) => {
  const id = req.params.id;
  findById(id)
    .then((user) => {
      if (user.id === id) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "does not exist" });
      }
    })
    .catch(() => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then((user) => {
      if (user.id === id) {
        res.status(200).json(user);
      } else {
        res
          .status(500)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(404).json({ message: "does not exist" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let body = req.body;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    findById(id).then((user) => {
      if (user) {
        update(user.id, body)
          .then((update) => {
            res.status(200).json(update);
          })
          .catch(() => {
            res
              .status(500)
              .json({ message: "The user information could not be modified" });
          });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    });
  }
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
