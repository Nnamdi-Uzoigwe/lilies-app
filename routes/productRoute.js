const express = require("express")
const products= require('../model/products')
const { findOne, findById } = require("../model/users")

const Router = express.Router()


Router.get("/", async(req, res) => {
    const allProducts = await products.find()

    res.json({products: allProducts})
})

Router.get("/:id", async(req,res) => {
    const id = req.params.id

    const product = await products.findById(id)

    if(product) {
        return res.json({product})

    }else {
        return res.json({message: "product not found"})
    }
})

Router.post("/add_meal", async(req, res) => {
    try {
        const {name, image, description, price, cookingTime} = req.body
        if(!name || name === "") {
            return res.json({message: "name of meal must be filled"})
        }else {
            const newProduct = await products.create(
                {
                    name, 
                    image, 
                    description, 
                    price, 
                    cookingTime
                }
            )
            return res.json({message: "meal added successfully", meal: newProduct})

        }

    } catch (error) {
        res.send(error.message)
    }
})

Router.put("/update_meal/:id", async(req, res) => {
    const id = req.params.id
    const updateData = req.body

    try {

        if(updateData.name === "" || !updateData.name){
            return res.json({message: "meal not found"})
        } else {
            const updatedMeal = await products.findByIdAndUpdate(
             id,              // The ID of the meal to update
             updateData,      // The data to update
             { new: true } 
            )

            return res.json({message: "meal updated sucessfully", updatedMeal})
        }



    } catch (error) {
        res.send(error.message)
    }
})

Router.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    try {
         const deleted = await products.findByIdAndDelete(id)

         if (!deleted) {
            return res.json({ message: "meal deleted successfully", message: 'Product not found' });
        }

        return res.json({ success: true, data: deleted });



    } catch (error) {
        return res.json({message: error.message})
    }
})



module.exports = Router