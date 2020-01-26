/*eslint no-unused-vars: off */
require('dotenv').config();
require('appmetrics-zipkin')({
  host: 'localhost',
  port: 9411,
  serviceName: 'chart-builder'
});
require('appmetrics-prometheus').attach();
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const globalSettings = require('./settings/globals');
const { configureRoutes } = require('./settings/routes');

// Setup health checker
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const app = express();
const server = http.createServer(app);

// Default environment is development
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

async function run() {
  await globalSettings();

  const pingcheck = new health.PingCheck('example.com');
  healthcheck.registerReadinessCheck(pingcheck);

  // Register a Liveness endpoint
  app.use('/live', health.LivenessEndpoint(healthcheck));

  // Register a readiness endpoint
  app.use('/ready', health.ReadinessEndpoint(healthcheck));

  // Configure the required middlewares
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.json({ type: 'application/*+json', limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    })
  );

  // Configure routes
  configureRoutes(app);

  // Handles the error from the API
  app.use((err, req, res, next) => {
    console.log('errro: ', err);
    if (!err.status || err.status === 500) {
      err.name = 'Internal Server Error';
      err.message = 'Something went wrong';
    }
    res.status(err.status || 500).json({
      name: err.name || 'Error',
      code: err.code || 'UNKNOWN',
      status: err.status || 500,
      message: err.message
    });
  });

  // Start server only when the environment is not testing
  if (process.env.NODE_ENV !== 'testing') {
    server.listen(process.env.PORT || 5000);
  }
  return app;
}

if (process.env.NODE_ENV === 'testing') {
  module.exports = run;
} else {
  run();
}
