var express = require('express');
var router = express.Router();

module.exports = (apps) => {

  apps.use('/index', router);

  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  });

}