const mongoose = require('mongoose');
var config = require('../appConfig');
const mainDb = config.mongoDbURI.mainDb;

module.exports = {
    mainDb: mongoose.createConnection(mainDb, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true 
    }, function (err, connections) {
        if (err) {
            console.log(err);
        } else {
            console.log("Appiness "+ mainDb +" connected successfully");
            return connections;
        }
    })
};