const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

module.exports.Signup = async (req, res) => {
  console.log(req.body);
  // const { errors, isValid } = validateRegisterInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // await User.findOne({ email: req.body.email }).then((user) => {
  //   if (user) {
  //     return res.status(400).json({ email: "Email already exists" });
  //   } else {
  //     const newUser = new User({
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: req.body.password,
  //     });
  //     bcrypt.genSalt(10, (err, salt) => {
  //       bcrypt.hash(newUser.password, salt, (err, hash) => {
  //         if (err) throw err;
  //         newUser.password = hash;
  //         newUser
  //           .save()
  //           .then((user) => res.json(user))
  //           .catch((err) => console.log(err));
  //       });
  //     });
  //   }
  // });
};

module.exports.Login = async (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  // const email = req.body.email;
  // const password = req.body.password;
  // await User.findOne({ email }).then((user) => {
  //   if (!user) {
  //     return res.status(404).json({ error: "Email not found" });
  //   }
  //   bcrypt.compare(password, user.password).then((isMatch) => {
  //     if (isMatch) {
  //       const payload = {
  //         id: user.id,
  //         name: user.name,
  //       };
  //       jwt.sign(
  //         payload,
  //         keys.secretOrKey,
  //         {
  //           expiresIn: 31556926,
  //         },
  //         (err, token) => {
  //           res.json({
  //             success: true,
  //             token: "Bearer " + token,
  //           });
  //         }
  //       );
  //     } else {
  //       return res.status(400).json({ error: "Password incorrect" });
  //     }
  //   });
  // });
  console.log(req.body);
};

module.exports.UserInfo = (req, res) => {
  const token = req.authorization.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user });
      else return res.json({ status: false });
    }
  });
};
