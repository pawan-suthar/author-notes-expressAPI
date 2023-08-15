const usermodal = require("../modal/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  // check if exist
  const { username, email, password } = req.body;
  try {
    const exist = await usermodal.findOne({ email: email });
    if (exist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashpass = await bcrypt.hash(password,10);
    const result = await usermodal.create({
      email:email,
      password:hashpass,
      username:username 
    });

    const token = jwt.sign({email:result.email, id:result._id},SECRET_KEY);
    res.status(201).json({user:result,token:token})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"gadbad hai"})
  }
};



const signin = async (req, res) => {
  const  { email , password}  = req.body ;
  try {
    const exist = await usermodal.findOne({ email: email });
    if (!exist) {
      return res.status(404).json({ message: "User not found" });
    }

    const passmatch = await bcrypt.compare(password,exist.password)
    if(!passmatch){
      res.status(404).json({message:"password  not match"})
    }

    const token = jwt.sign({email:exist.email, id:exist._id},SECRET_KEY);
    res.status(200).json({user:exist,token:token})

  } catch (error) {

    console.log(error);
    res.status(500).json({message:"gadbad hai"})
  }
  

};

module.exports = {signin, signup};
