const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const hashedPassword = require('../utilsServer/auth');
const isEmail = require('validator/lib/isEmail');
const userPng =
  'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png';

// const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

// router.get("/:username", async (req, res) => {
//   const { username } = req.params;

//   try {
//     if (username.length < 1) return res.status(401).send("Invalid");

//     if (!regexUserName.test(username)) return res.status(401).send("Invalid");

//     const user = await UserModel.findOne({ username: username.toLowerCase() });

//     if (user) return res.status(401).send("Username already taken");

//     return res.status(200).send("Available");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(`Server error`);
//   }
// });

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  if (!isEmail(lowerCaseEmail))
    return res.status(422).json({ message: 'Invalid Email' });

  if (password.length < 6) {
    return res
      .status(422)
      .json({ message: 'Password must be atleast 6 characters' });
  }

  try {
    const existingUser = await UserModel.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(401).json({ message: 'User already registered' });
    }
    //
    const hashedPasswordValue = await hashedPassword(password);
    const user = new UserModel({
      email: lowerCaseEmail,
      password: hashedPasswordValue,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });
    await user.save();
    const payload = { userId: user._id };
    res.status(201).json({ message: 'Created user' });
    // jwt.sign(
    //   payload,
    //   process.env.jwtSecret,
    //   { expiresIn: '2d' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.status(200).json(token);
    //   }
    // );
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
