import mongoose from"mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
    },
    fullname:{
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
  },
  {toJSON: {virtuals: true}}
  
)

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next (err);
      this.password = hash;
      next();
    })
  }
})

userSchema.methods.comparePassword = async function(password){
  if(!password) throw new Error("Password is missing,can not compare!");
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

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

userSchema.statics.isThisUserName = async function(username){
  if (!username) throw new Error("Invalid Username")
  try{
    const user = await this.findOne({username: username})
    if (user){
      return true
    }
    return false;
  }catch(err){
    console.log("error in isThisEmailInUse method", err.message)
    return false
  }
}

export const User = mongoose.model('User', userSchema);