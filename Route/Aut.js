const express=require('express')
const { Signup, Login } = require('../Controller/Aut')
const AutRouter=express.Router()


AutRouter.route("/Signup").post(Signup)
AutRouter.route("/Login").post(Login)

module.exports=AutRouter