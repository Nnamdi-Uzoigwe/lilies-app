const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    cookingTime: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }


},
{
    timestamps: true
}
)

module.exports = mongoose.model('products', productsSchema)