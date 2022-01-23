const registerValidation = (req,res)=>{
    console.log(req)
    const { firstName, lastName, email, phoneNumber, password, confirmPassword} = req

    if(!firstName){ 
        res.status(400).send("You omitted first name field")
        return false
    }
    if(!lastName){ 
        res.status(400).send("You omitted last name field")
        return false
    }
    if(!email){ 
        res.status(400).send("You omitted last name field")
        return false
    }else if(!email.includes('@')){
        res.status(400).send("Invalid email address")
        return false 
    }
    if(!phoneNumber){ 
        res.status(400).send("You omitted phone number field")
        return false
    } else if(phoneNumber.lenght < 11){
        res.status(400).send("Phone number must be more than 11 characters")
        return false
    }
    if(!password && !confirmPassword){ 
        res.status(400).send("password and confirm password must not be empty")
        return false
    }else if(password != confirmPassword){
        res.status(400).send("The passwords must match")
        return false 
    }else if(password.lenght < 5 && confirmPassword.lenght < 5){
        res.status(400).send("Enter atleast 5 characters for password")
    }
    return true
};

const loginValidation = (object,res)=>{
    // console.log(object, "Herer")

    const {password, email} = object
    if(!email){ res.status(400).send("You omitted last name field"); return false}

    if(!email.includes('@')){ res.status(400).send("Invalid email address"); return false }
    if(!password ){ res.status(400).send("password field must not be empty"); return false }
   return true
}


const ResetPasswordValidation = (object,res)=>{
    const {password, confirmPassword} = object
    if(!password){ res.status(400).send("You omitted password field"); return false}

    if(!confirmPassword ){ res.status(400).send("The two password fields must match"); return false }
   return true
}


const Ordervalidation = (object, res)=>{
const {cakeName, cakeSize, cakeColors, cakePrize, status, deliveryDate} = object
if(!cakeName){ res.status(400).send("Cake name must not be empty"); return false}
if(!cakeSize){ res.status(400).send("Cake size must not be empty"); return false}
if(!cakeColors){ res.status(400).send("Cake color must not be empty"); return false}
if(!cakePrize){ res.status(400).send("Cake prize must not be empty"); return false}
if(!status){ res.status(400).send("Status must not be empty"); return false}
if(!deliveryDate){ res.status(400).send("You skipped delivery date"); return false}

return true
}
module.exports = {registerValidation, loginValidation, ResetPasswordValidation, Ordervalidation}