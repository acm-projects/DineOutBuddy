const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("App is connect to Database");
}).catch(err => console.log(err.message));