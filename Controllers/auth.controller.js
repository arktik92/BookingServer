const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');



// MARK: - Clé secrete
const SECRET_KEY = process.env.SECRET_KEY;


// Fonction avec un regex qui verifie le pattern de l'email
const emailValidator = (email) => {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const signIn = async (req, res) => {
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
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect", status: 400});

    // Creation du payload qui va servir a la creation du token 
  const payload = {
    username: user.username,
    role: user.role
  };

  // Création du token grace a "JSONwebToken" il prend en parametres (payload, clé secrete, { expiration })
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
  // On renvoie le token a l'utilisateur
  res.status(201).json({ token: token });

  // res.json({message: 'signin'});
}

const signUp = async (req, res, next) => {
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
      .json({ error: "Email input is not in a valid email format.", status: 400});
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

  // try {} catch {}; pour la gestion de l'erreur 
  try {
    // Envoie du user sur la base de donnée 
    await User.create(user);
    // Reponse du server
    res.status(201).json({ user: user, status: 201 });
  } catch (e) {
    // reponse du server 
    res.status(500).send(e.message)
  }
};



const sendEmailForResetPwd = async (req, res) => {
  const email = req.body.email;
    // Configurer Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'esteban.semellier@gmail.com',
          pass: 'hzls qqiw huxq abbu'
      }
  });

    const resetUrl = `http://127.0.0.1:8080/auth/resetpassword`; // URL de réinitialisation

    // Contenu de l'email
    let mailOptions = {
      from: 'esteban.semellier@gmail.com',
      to: email,
      subject: 'Réinitialisation du mot de passe',
      html: `
          <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
          <a href="${resetUrl}">Réinitialiser le mot de passe</a>
      `
  };

    // Envoyer l'email
    await transporter.sendMail(mailOptions)
    .then(() => {
      res.send('Email envoyé');
    })
};


const resetPassword = async (req, res, next) => {
  const { email, password: newPassword } = req.body; // Utiliser req.body ici

  if (!email || !newPassword) {
      return res.status(400).send('Email et mot de passe sont requis.');
  }

  try {
      let user = await User.findOne({ where: { email: email } });

      if (!user) {
          return res.status(404).send('Utilisateur non trouvé.');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;

      await user.save();

      res.send('Mot de passe réinitialisé avec succès.');
  } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      res.status(500).send('Erreur serveur.');
  }
};


const newResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email requis' });
        }

        let user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ error: `Aucun utilisateur trouvé avec l'email : ${email}` });
        }

        // Générer un token de réinitialisation
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Enregistrer le token avec l'utilisateur, avec une expiration
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

        await user.save();

        // Envoyer l'email
        await sendEmailForResetPwd(user.email, resetToken);

        res.status(200).json({ message: "Email de réinitialisation envoyé" });
    } catch (error) {
        console.error('Reset Password Error:', error);
        next(error);
    }
};


module.exports = {
    signIn,
    signUp,
    resetPassword, 
    sendEmailForResetPwd
}