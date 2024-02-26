const User = require("../models/auth_model");

const bcrypt = require("bcrypt");
const saltRound = 10;

exports.signupController = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(saltRound);
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const newuser = await User.create({
      username,
      password: hashpassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newuser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: `Fail ${error}`,
    });
  }
};

 exports.loginController = async (req, res) => {
        const {username, password} =  req.body

        try {
       const user =  await  User.findOne({username})

       if(!user){
        res.status(404).json({
            status: "Fail",
            message: "User not found"
        })
       }
       const isCorrect =   await bcrypt.compare(password, user.password)


       if (isCorrect) {
        res.status(200).json({
            status: "Success",

        })
       }else {
        res.status(400).json({
            status: "Fail",
            message: "Incorrect User name and password"
        })
       }

        } catch (error) {
            res.status(400).json({
                status: "Fail"
            })
        }
}