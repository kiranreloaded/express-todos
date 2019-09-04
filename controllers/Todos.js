import {
  Defaults,
  Messages,
  responseHandler,
} from '../util';

const _ = require('underscore');

let todos = [];

const get = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : Defaults.QUERY_LIMIT;
  // const page = req.query.page ? parseInt(req.query.page, 10) : Defaults.QUERY_PAGE;
  // const skip = (page - 1) * limit;
  try {
    const result = _.first(todos, limit);
    return responseHandler(res, 200, true, Messages.SUCCESS_GET_TODOS, result);
  } catch (error) {
    return responseHandler(res, 500, false, Messages.ERROR_GET_TODOS, error.toString());
  }
};

const post = async (req, res) => {
  try {
    if (req.body) {
      const id = todos.length + 1;
      req.body.id = id;
      todos.push(req.body);
      const result = req.body;
      return responseHandler(res, 201, true,
        Messages.SUCCESS_CREATE_TODOS, result);
    }
    return responseHandler(res, 500, false,
      Messages.ERROR_CREATE_TODOS, Messages.ERROR_REQUEST_BODY_EMPTY);
  } catch (error) {
    return responseHandler(res, 500, false,
      Messages.ERROR_CREATE_TODOS, error.toString());
  }
};

const getById = async (req, res) => {
  try {
    const todosId = parseInt(req.params.id, 10);
    const index = _.findIndex(todos, { id: todosId });
    if (index > -1) {
      const result = todos[index];
      return responseHandler(res, 201, true,
        Messages.SUCCESS_GET_TODOS_BY_ID, result);
    }
    return responseHandler(res, 201, true,
      Messages.NOT_FOUND_GET_TODOS_BY_ID, []);
  } catch (error) {
    return responseHandler(res, 500, false,
      Messages.ERROR_GET_TODOS_BY_ID, error.toString());
  }
};

const deleteById = async (req, res) => {
  try {
    if (req.body) {
      const todosId = parseInt(req.params.id, 10);
      todos = _.without(todos, _.findWhere(todos, { id: todosId }));
      return responseHandler(res, 201, true,
        Messages.SUCCESS_DELETE_TODOS, null);
    }
    return responseHandler(res, 500, false,
      Messages.ERROR_DELETE_TODOS, Messages.ERROR_REQUEST_BODY_EMPTY);
  } catch (error) {
    return responseHandler(res, 500, false,
      Messages.ERROR_DELETE_TODOS, error.toString());
  }
};

export default {
  get,
  post,
  getById,
  deleteById,
};
