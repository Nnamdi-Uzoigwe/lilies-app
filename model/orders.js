const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    productId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
      },
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Cooking"
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("orders", ordersSchema)