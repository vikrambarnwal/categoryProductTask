var Mongoose = require('mongoose');
const db = require('../helpers/dbConnection')

const categorySchema = new Mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = db.mainDb.model('category', categorySchema);