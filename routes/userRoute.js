const express = require("express")
const users = require("../model/users")
const bcrypt = require("bcrypt")


const Router = express.Router()

Router.get("/", async(req, res) => {
    const allUsers = await users.find()
    res.json({
        "users": allUsers
    })
})

Router.post("/signup", async(req, res) => {

    try {
        //collects user input
        const {name, password, email} = req.body
        //checks if the input exist or are non-empty
        if(name === "" || !name) {
            res.send("Please enter Name")
        }else if(password === "" || !password) {
            res.send("Please enter password")
        } else if(email === "" || !email) {
            res.send("Please enter email")
        } else {

            const userExist = await users.findOne({email})

            if(userExist) {
                return res.json({message: "email already exist"})
            } else {
                    // create the user if all validation is passed

                     // Hash the password
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const newUser = await users.create({
                        name,
                        password : hashedPassword, 
                        email
                    })
                
                return res.json({message: "user Created Succesfully", user: newUser})

            }
    
        }
        
    } catch (error) {
        res.send(error.message)
    }
})


Router.post("/signin", async(req, res) => {
    try {
        const { email, password } = req.body

        if(email === "" || !email) {
            res.send("Please enter email")
        } else if(password === "" || !password) {
            res.send("Please enter password")
        } else {
            const userExist = await users.findOne({email})

            if(userExist) {
                const passwordMatch = await bcrypt.compare(password, userExist.password)
                if(passwordMatch) {
                    return res.json({message: "user logged in successfully", user: userExist})
                } else{
                    res.json({message: "invalid email or password"})
                }
                  
            } else {
                res.send("User does not exist")
            }
        }
    } catch (error) {
        return res.json({message: error.message})
    }
})


module.exports = Router