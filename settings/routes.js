const express = require("express");
// const policies = require("../app/policies");

const router = express.Router();

const routeConfigurations = {
  "GET /": {
    "action": "info",
  },
  // "GET /someroute": {
  //   "action": "someroute",
  //   "policies": [policies.pagination, policies.authorize]
  // },
  "GET /health": {
    "action": "health"
  },
  "POST /user": {
    "action": "user"
  }
};

module.exports.configureRoutes = (app) => {
  const routes = Object.keys(routeConfigurations);
  routes.forEach((route) => {
    const [method, path] = route.split(" ");
    router[method.toLowerCase()](path, routeConfigurations[route].policies || [], require(`../app/controllers/${routeConfigurations[route].action}`));
  });
  app.use("/", router);
  return;
};

