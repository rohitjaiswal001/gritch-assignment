const { model,Schema } = require('mongoose');

const userSchema = new Schema({
  username : {
    type : 'String',
    unique : true,
  },
  password : 'String',
  email : {
    type : 'String',
    unique : true,
    validate : {
      validator : (email)=>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
          return true;
        
        return false;
        
      },
      message : ()=>{
        return 'invalid email format';
      }
    },
  }
});


let user = model('users',userSchema);
module.exports = model('users',userSchema);