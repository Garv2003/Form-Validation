const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const dotenv = require("dotenv");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports.Signup = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.Login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: 31556926,
      });

      return res.json({
        success: true,
        token: "Bearer " + token,
      });
    } else {
      return res.status(400).json({ error: "Password incorrect" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.UserInfo = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.json({ status: false });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.json({ status: false });
      } else {
        const user = await User.findById(data.id).select("-password");

        if (!user) return res.json({ status: false });

        if (user) return res.json({ status: true, user: user });

        return res.json({ status: false });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.forgetpassword = async (req, res) => {
  console.log(req.body);
  if (!req.body.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "10m",
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password reset link",
      html: `
        <h2>Please click on given link to reset your password</h2>
        <p>${process.env.CLIENT_URL}/reset?token=${token}</p>
      `,
    };

    user.resetToken = token;

    await user.save();

    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }

    if (data) {
      return res.json({ message: "Reset password link sent to your email" });
    }
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.resetpassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = "";

    await user.save();

    return res.json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Token expired try again" });
  }
};
