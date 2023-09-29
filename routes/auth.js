const express = require("express");
const router = express.Router();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

// MARK: - Clé secrete
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signup", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const { role, firstName, lastName, email, phoneNumber } = req.body;

  const user = {
    firstName,
    lastName,
    password: hashedPassword,
    role,
    email,
    phoneNumber,
  };

  // const user = {
  //     password: hashedPassword,
  //     role: req.body.role,
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     phoneNumber: req.body.phoneNumber
  // };

  try {
    await User.create(user);
    res.status(201).json({ user });
  } catch (e) {
    res.status(500).send(e.message)
  }
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user)
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });

  console.log(`userID: ${user.id}`);

  if (!req.session) {
    req.session = {};
  }

  req.session.userId = user.id;

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });

  const payload = {
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(201).json({ message: token });

  // res.json({message: 'signin'});
});

module.exports = router;
