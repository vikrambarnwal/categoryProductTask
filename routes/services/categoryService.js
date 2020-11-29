const category = require('../../models/categoryModel');
const product = require('../../models/productModel');
var asyncLib = require('async');

module.exports = class CategoryService {
    constructor() {}

    /** Delete Category Along with Product Data */
    async deleteCategory(categoryId, cb) {
        asyncLib.waterfall([
            function(callback){
                //Find product data to be deleted
                product.find({
                    categoryId: categoryId,
                    isDeleted: false
                }).exec(function (err, result) {
                    if (err || !result) {
                        return cb(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            },
            function (products,callback) {
                 //Deleteing product data soft delete only
                product.updateMany({
                    categoryId: categoryId
                },{$set: {isDeleted: true}}, {multi: true}).exec(function (err, result) {
                    if (err || !result) {
                        return cb(err, null);
                    } else {
                        callback(null, products);
                    }
                });
            },
            function (products,callback) {
                //delete category by id
                category.updateOne({
                    _id: categoryId
                },{$set: {isDeleted: true}}, {multi: true}, function (err, updateData) {
                    if (err) {
                        return callback(err, null)
                    } else {
                        return callback(null, products);
                    }
                })
            }
        ], function (err, data) {
            if (err) {
                return cb(err)
            } else {
                return cb(null, data)
            }
        })
    }

    /** Find Category Along with Product Data */
    async getProductCategory(categoryId, cb) {
        product.find({
            categoryId: categoryId,
            isDeleted: false
        }).populate('categoryId').exec(function (err, result) {
            if (err || !result) {
                return cb(err, null);
            } else {
              return  cb(null, result);
            }
        });
    }

    /** Find Category Data */
    async getCategory(cb) {
        category.find({isDeleted: false}).exec(function (err, result) {
            if (err || !result) {
                return cb(err, null);
            } else {
               return cb(null, result);
            }
        });
    }

};