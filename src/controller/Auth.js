const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../configAuth");


const registrer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).send("all input are require");
    }

    let encrypetedPassword = await bcrypt.hash(req.body.password, 10);

    const oldUser = await User.findOne({ where: { email: email } });

    if (oldUser) {
      return res.status(409).json({ msg: "already exist a user with this email, try to sing up" });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encrypetedPassword,
    });


    return res.status(200).json({ msg: "User created sucefully", data: user });
  } catch (error) {
    res.status(404).send("Ups something went wrong, try again");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////


const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      res.status(400).send("all input are required");
    }

    const user = await User.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {

      let token = jwt.sign(
        { user_id: user.userId, email },
        authConfig.secret,
        {
          expiresIn: authConfig.expires,
        }
      );

      user.token = token
    }
    return res.status(200).json({user: user, })

  } catch (error) {
    res.status(404).send("Ups something happens")
  }
};

////////////////////////////////////////////////////////////////////////////////////////////





module.exports = {
  logIn,
  registrer,
  
};


