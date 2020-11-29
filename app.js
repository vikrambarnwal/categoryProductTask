var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Router = require('./routes/route');

const CategoryModel = require('./models/categoryModel');
const ProductModel = require('./models/productModel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Router());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var defaultDataForInsert = [{
  "categoryData": {
    "categoryName": "Cloth"
  },
  "productData": [{
    "productName": "Jeans",
    "price": 1000
  }, {
    "productName": "Shirt",
    "price": 800
  }]
}, {
  "categoryData": {
    "categoryName": "Mobile"
  },
  "productData": [{
    "productName": "MI",
    "price": 10000
  }, {
    "productName": "Oppo",
    "price": 8000
  }]
}];
//Add Category and Product
defaultDataForInsert.forEach(function (categoryProductData) {

  var newCategory = new CategoryModel(categoryProductData.categoryData);

  CategoryModel.findOne({
    "categoryName": categoryProductData.categoryData.categoryName
  }, function (err, result) {
    if (err) {
      //console.log(err);
    } else if (!result) {
      newCategory.save(function (err, result) {
        if (err) {
          //console.log(err);
        } else {
          categoryProductData.productData.map(product => Object.assign(product, {
            'categoryId': result._id
          }));
          console.log(categoryProductData);
          ProductModel.insertMany(categoryProductData.productData).then(function (data) {
            console.log("Data inserted") // Success 
          }).catch(function (error) {
            console.log(error) // Failure 
          });
        }
      })
    } else {
      //console.log('Already Exist in Admin');
    }
  });

});


module.exports = app;