/* eslint-disable arrow-body-style */
import {
  Messages,
  responseHandler,
} from '../util';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  return responseHandler(res, 201, true,
    Messages.SUCCESS_INDEX, { message: 'Hello World' });
});

module.exports = router;
