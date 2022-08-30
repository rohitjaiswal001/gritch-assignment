const express = require('express');
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/User')

const app = express();
mongoose.connect(process.env.MONGO_URI);
app.use( cors() )
app.use(express.json({ limit : '16mb' }));
app.use(bodyParser.json({ limit : '16mb' }))
app.use(express.urlencoded({extended:false}));

// app.get("/",async (req,res)=>{
//   let obj= await User.create({username:"kripan",email:"kripanshu@gmail.com",password:"1234" })
//   res.send(obj)
// })

app.post('/login',require('./controller/userController').login);
app.post('/register',require('./controller/userController').register);

mongoose.connection.once('open',()=>{
  console.log('connected to db');
  app.listen(process.env.PORT||3500,()=>{
    console.log(`listening to port : ${process.env.PORT}`);
  });
});