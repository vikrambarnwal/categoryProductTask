var Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const db = require('../helpers/dbConnection')

const productSchema = new Mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId, required: true, ref: 'category'
    },
    price: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = db.mainDb.model('product', productSchema);