const User = require("../Model/userModel")
const OrderedCake = require("../Model/orderModel")
const passHash = require('password-hash')
const {v4: uuidv4} = require('uuid')
const {tokenize} = require('../Token')

// Functionality Logics 
const RegistrationLogic = (obj, res)=>{
const {firstName, lastName, email, phoneNumber, password, confirmPassword} = obj
    User.findOne({email:email}, (err, obj)=>{
        if(obj){
            res.status(400).send("A user with the email already exist")
        }else{
            const hashedPassword = passHash.generate(password)
            const user = {email, phoneNumber}
           Token = tokenize(user)
            const newUser = new User({
                email, 
                firstName, 
                lastName, 
                phoneNumber, 
                password:hashedPassword,
                Token,
                profilePic:'default.png',
            })
            newUser.save().then(result=>{
                if(result){
                   
                    res.status(201).send("Successful, please go and login")
                }else{
                    res.status(500).send(err || "Unable to process your request!")
                }
            })
        
        }
    })
}

const LoginLogic = (obj, res)=>{
    const {email,password}= obj
    User.findOne({email:email}, (err, objs)=>{
        console.log(objs)
        if(objs != null){
            const dbPassword = objs.password
            let verifiedPassword = passHash.verify(password, dbPassword )
            if(verifiedPassword){
                let Token = objs.Token
                res.status(200).send(Token)
            }else{
                res.status(400).send("Wrong login password")
            }
        }else{
            res.status(404).send("No user with the provided email, please register")
        }
    })
}

const ResetPasswordLogic =async (obj, res)=>{  
    const {Token, password} = obj  
    const hashedPassword = passHash.generate(password)
   const updatedUser= await User.findOneAndUpdate({Token:Token}, {password:hashedPassword})
   if(updatedUser){
       res.status(201).send("Password reset succesful")
   }else{
    res.status(400).send("An error occured, try again!")
   }
}

const ForgotPasswordLogic = (Email, res)=>{
    User.findOne({email:Email}, (err, obj)=>{
        if(obj ){
            res.status(200).send(obj.Token)
        }else{
            res.status(404).send("User object not found")
        }
    })
}

const OrderCreationLogic = (obj, res)=>{
    const {cakeName, cakeSize, cakeColors, cakePrize, status, deliveryDate,  Token} = obj
    User.findOne({Token:Token}, (err, result)=>{
        if(result != null){
           let userId = result._id
           
           const newOrder = new OrderedCake({
               cakeName, 
                cakeSize, 
                cakeColors, 
                cakePrize, 
                status, 
                deliveryDate,
                userId,
              
                orderId:uuidv4()
            })
            
            newOrder.save().then(data=>{
               if(data){
                   res.status(201).send("Congratulations, please, make your payment!")
               }else{
                   res.status(500).send("Error in creating your order, please try again!")
               }
           })
        }else{
            res.status(404).send("Only registered users will be able to make an order")
        }
    })

}

const GetUserServices = (Token, res)=>{
    User.findOne({Token:Token}, (err, obj)=>{
        if(obj !=null){
            const {firstName, lastName, phoneNumber, email,   profilePic} = obj

            let data = {firstName, lastName,phoneNumber,email,   profilePic}
            res.status(200).send(data)
        }else{
            res.status(404).send("User not found")
        }
    })
}

const GetAllOrderServices=(Token, res)=>{
User.findOne({Token:Token}, (err, obj)=>{
    if(obj!=null){
        let userId = obj._id
        OrderedCake.find({userId:userId}).then(result=>{
            res.status(200).send(result)
        })
        
    }
})
}
module.exports = {RegistrationLogic, LoginLogic, ResetPasswordLogic, ForgotPasswordLogic, OrderCreationLogic, GetUserServices, GetAllOrderServices} 