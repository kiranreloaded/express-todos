#!/usr/bin/env node

/**
 * Module dependencies.
 */
const http = require('http');
const queryString = require('querystring');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('../app');

const { log } = console;

require('dotenv').config();
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log(chalk.red(`${bind} requires elevated privileges`));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log(chalk.red(`${bind} is already in use`));
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function DBInit() {
  const username = queryString.escape(process.env.MONGODB_USERNAME);
  const password = queryString.escape(process.env.MONGODB_PASSWORD);
  const host = queryString.escape(process.env.MONGODB_URL);
  const dbport = queryString.escape(process.env.MONGODB_PORT);
  const dbname = queryString.escape(process.env.MONGODB_NAME);
  const mongoConnString = `mongodb://${username}:${password}@${host}:${dbport}/${dbname}`;
  mongoose.connect(mongoConnString, { useNewUrlParser: true }, (err) => {
    if (err) { throw err; }
    log(chalk.green(`[division-api] mongodb connected successfully: ${mongoConnString}`));
  });
}

function onListening() {
  //DBInit();
  log(chalk.green(`[division-api] app started successfully on port: ${port}`));
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
