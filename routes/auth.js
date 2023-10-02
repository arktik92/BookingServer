const express = require("express");
const router = express.Router();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

// MARK: - Clé secrete
const SECRET_KEY = process.env.SECRET_KEY;


// Fonction avec un regex qui verifie le pattern de l'email
const emailValidator = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

router.post("/signup", async (req, res, next) => {
    // Creation du Salt pour le cryptage du password
  const salt = await bcrypt.genSalt(10);

// Creation du mot de passe hash via BCrypt bcrypt.hash("password", salt);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Appel de chaque variable qui sont envoyé depuis le formulaire
  const { role, firstName, lastName, email, phoneNumber } = req.body;

  // Validate email format
  if (!emailValidator(email)) {
    return res
      .status(400)
      .json({ error: "Email input is not in a valid email format." });
  }

  // Crétation de l'utilisateur a envoyer a la base de donnée  
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


  // try {} catch {}; pour la gestion de l'erreur 
  try {
    // Envoie du user sur la base de donnée 
    await User.create(user);
    // Reponse du server
    res.status(201).json({ user });
  } catch (e) {
    // reponse du server 
    res.status(500).send(e.message)
  }
});

router.post("/signin", async (req, res) => {
    // Recherche du user grace a la methode findOne et a l'email
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  // Si il n'xiste pas de User evec l'email correspondant on renvoie une erreur 
  if (!user)
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });

      // Init de req.session pour stocker l'id du currentUser 
  if (!req.session) {
    req.session = {};
  }

  // implementation  du req.session avec l'id du currentUser
  req.session.userId = user.id;

  // Verification du password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect" });

    // Creation du payload qui va servir a la creation du token 
  const payload = {
    username: user.username,
  };

  // Création du token grace a "JSONwebToken" il prend en parametres (payload, clé secrete, { expiration })
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  // On renvoie le token a l'utilisateur
  res.status(201).json({ message: token });

  // res.json({message: 'signin'});
});

// On exporte le tout 
module.exports = router;