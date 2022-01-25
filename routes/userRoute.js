const express = require('express')
const router = express.Router()
const {registerValidation, loginValidation, ResetPasswordValidation, Ordervalidation} = require("../validation/Validation")
const {RegistrationLogic, LoginLogic, ForgotPasswordLogic, ResetPasswordLogic, ChangePasswordLogic,OrderCreationLogic,GetUserServices,GetAllOrderServices} = require('../services/UserServices')
const User = require('../Model/userModel')

// configured routes
router.post('/register', (req, res, next)=>{
    console.log(req.body)
if(registerValidation(req.body, res)){
    RegistrationLogic(req.body, res)
}
})

router.post('/login', (req, res, next)=>{
if(loginValidation(req.body, res)){
    LoginLogic(req.body, res)
}
})

router.post('/password/forgot', (req,res)=>{
    const email = req.body.email
    if(email.includes('@') && email !=null){
        ForgotPasswordLogic(email, res)
    }else{
        res.status(400).send("Invalid email")
    }
})

router.post('/password/reset', (req, res)=>{
    if(ResetPasswordValidation(req.body,res)){
        ResetPasswordLogic(req.body, res)
    }
})

router.post('/password/change', (req, res)=>{
    if(ResetPasswordValidation(req.body,res)){
        ChangePasswordLogic(req.body, res)
    }
})

router.post('/order/create', (req, res)=>{
    console.log(req.body)
    if(Ordervalidation(req.body,res)){
        OrderCreationLogic(req.body, res)
    }
})


router.get('/user/:token', (req, res)=>{
    let Token = req.params.token
    if(Token){
        GetUserServices(Token, res)
    }
})

router.get('/data/:token', (req, res, next)=>{
    let Token = req.params.token
    if(Token){
        GetAllOrderServices(Token, res)
    }
 
    })
router.post('/update/status', (req,res)=>{
    if(req.body){
        
    }
})
module.exports = router