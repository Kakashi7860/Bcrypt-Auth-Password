const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const User = require("./user")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/authDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))





app.post("/register",async(req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,5)
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    await user.save()
    res.send("user Registered Successfully")
})

app.listen(3000,()=>{
    console.log("Server is running")
})