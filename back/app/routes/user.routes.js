module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.post("/sign-in", users.findOnesdfq);

  app.use('/api/users', router);
};
