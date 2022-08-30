const User = require('../model/User');
const bcrypt = require('bcrypt');

const login = async (req,res)=>{
  const { email,password } = req.body;
  if( !email )
    return res.status(409).json({ auth:false, msg : 'email required' });
  if( !password )
    return res.status(409).json({auth:false, msg : 'password required' });

  let user = await User.findOne({ email });
  
  if( !user )
    return res.status(409).json({ auth:false,msg : 'email not registered' });
  
  let matched = await bcrypt.compare(password,user.password);

  if( !matched )
    return res.status(409).json({ auth:false,msg : 'password not matched' });

  return res.status(200).json({ auth:true ,msg : 'logged in',username:user.username });
}

const register = async (req,res)=>{
  const { username,email,password } = req.body;
  if( !username )
    return res.status(409).json({ register:false, msg : 'username can not be empty string' });

  if( !email ) 
    return res.status(409).json({ register:false,msg : 'email required'});

  if( !password )
    return res.status(409).json({ register:false,msg : 'password required'});

  try{
    const hashedpwd = await bcrypt.hash(password,10);
    const user = await User.create({username,email,password:hashedpwd});
    return res.status(201).json({register:true,user:user});
  }
  catch(err){
    return res.status(500).json({ register:false ,msg : err});
  }

};

module.exports = {
  login,
  register
}