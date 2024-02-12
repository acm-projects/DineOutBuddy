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

module.exports = mongoose.model('User', userSchema);