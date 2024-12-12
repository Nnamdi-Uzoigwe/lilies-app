const express = require('express')
const Router = express.Router()
const user = require('../model/users')
const product = require('../model/products')
const Cart = require('../model/cart')

//returning cart base on logged in user
Router.post('/:id', async(req, res) => {
    const userId = req.params.id
        try {
            if (!userId || userId ===""){
                return res.json({message: "user must be valid"})
            } else {
                const cart = await Cart.find({userId}).populate('productId', 'name image description price cookingTime quantity').populate('userId', 'name email, _id'); 
                return res.json({cart: cart})
            }
            
        } catch (error) {
            res.send(error.message)
        }
})

Router.post("/add", async(req, res) => {
    const {userId, productId} = req.body

    try {
        if(userId === "" || !userId){
            return res.json({message: "cannot add to cart without user"})
        } else if(productId === "" || !productId){
            return res.json({message: "cannot add to cart without product"})
        } else{
            const newCart = await Cart.create({
                userId, 
                productId
            })

            return res.json({newCart: newCart})
        }
    } catch (error) {
       return res.send(error.message)  
    }
})

Router.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    try {
         const deleted = await Cart.findByIdAndDelete(id)

         if (!deleted) {
            return res.json({ message: "meal deleted successfully", message: 'Product not found' });
        }

        return res.json({ success: true, data: deleted });



    } catch (error) {
        return res.json({message: error.message})
    }
})



module.exports = Router

