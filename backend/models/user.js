const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    },
    avatar:{
      type: Buffer,
    },
    allergies:{
      type: [
        {type: String, required: true},
      ],
      required: true,
    },
    preferences:{
      type: [
        {type: String, required: true},
      ],
      required: true,
    },
  }
)

userSchema.statics.isThisEmailInUse = async function(email){
  if (!email) throw new Error("Invalid Email")
  try{
    const user = await this.findOne({email: email})
    if (user){
      return true
    }
    return false;
  }catch(err){
    console.log("error in isThisEmailInUse method", err.message)
    return false
  }
}


  

module.exports = mongoose.model('User', userSchema);