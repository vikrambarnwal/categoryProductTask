const express = require('express');

const indexController = require('./controller/index');
const categoryController = require('./controller/category');

const newrouter = express.Router();

module.exports = () => {
    indexController(newrouter);
    categoryController(newrouter);

    return newrouter;
};
