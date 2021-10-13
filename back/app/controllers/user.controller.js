const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.type) {
    res.status(400).send({ message: "Veuillez remplir tous les champs" });
    return;
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });

  User
    .find({email: req.body.email})
    .then(data => {
      if(data.length == 0) {
        user
        .save(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
          });
        });
      } else {
        res.send("Il y a déjà un utilisateur existant avec cette adresse email");
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  User
    .find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the Users."
      });
    });
};

exports.findOnesdfq = (req, res) => {

  if (!req.body.email || !req.body.password || !req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = {
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  };

  User
    .find(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the User."
      });
    });
};
