var express = require('express');
const categoryService = require('../services/categoryService');
var router = express.Router();

module.exports = (apps) => {

  apps.use('/category', router);

  /* GET category listing. */
  router.get('/', function (req, res, next) {
    var categorySer = new categoryService();
    categorySer.getCategory(function (err, result) {
      if (err) {
        return next({
          msg: err || responseFormats.message.serverError,
          errors: err,
          success: false
        });
      } else {
        if (result.length == 0) {
          return res.send({
            msg: responseFormats.message.accountNotFound,
            succeeded: true,
            data: null,
          });
        } else {
          return res.send({
            msg: 'Data Found',
            success: true,
            data: result
          });
        }
      }
    })
  });

  /* Delete Category and Product By Category Id */
  router.delete('/:categoryId', function (req, res, next) {
    var categorySer = new categoryService();
    categorySer.deleteCategory(req.params.categoryId, function (err, result) {
      if (err) {
        return next({
          msg: err || responseFormats.message.serverError,
          errors: err,
          success: false
        });
      } else {
        if (result.length == 0) {
          return res.send({
            msg: 'Category Deleted',
            success: true,
            data: null,
          });
        } else {
          return res.send({
            msg: 'Category Deleted',
            success: true,
            data: result
          });
        }
      }
    })
  });

  /* Get Category and Product By Category Id */
  router.get('/:categoryId', function (req, res, next) {
    var categorySer = new categoryService();
    categorySer.getProductCategory(req.params.categoryId, function (err, result) {
      if (err) {
        return next({
          msg: err || responseFormats.message.serverError,
          errors: err,
          success: false
        });
      } else {
        if (result.length == 0) {
          return res.send({
            msg: 'No Data Found',
            success: true,
            data: null,
          });
        } else {
          return res.send({
            msg: 'Data Found',
            success: true,
            data: result
          });
        }
      }
    })
  });

}