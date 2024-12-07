const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    productId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
},
    {
        timeStamps: true
    }
)

module.exports = mongoose.model('cart', cartSchema )