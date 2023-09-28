const express = require('express');
const router = express.Router();

const { User } = require('../db.js');


/* GET */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  const id = req.session.userId
  console.log(req.session.userId)
  console.log(id);
  const user = await User.findByPk(id);
  
  console.log(user);
  res.json(user)
})

/* POST */
const emailValidator = (email) => {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

router.post('/', async (req, res, next) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    } = req.body;

    // Validate input data types
    if (
      typeof role !== 'string' ||
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof phoneNumber !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({ error: 'All attributes must be strings.' });
    }

    // Validate email format
    if (!emailValidator(email)) {
      return res.status(400).json({ error: 'Email input is not in a valid email format.' });
    }

    // Additional validation for email and phone number if needed

    // Create the user
    const newUser = await User.create({
      role,
      firstName,
      lastName,
      email,
      phoneNumber,
      password
    });

    res.status(201).json({ message: "New user added", user: newUser });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

/* PUT */
router.put('/:id', async (req, res, next) => {
  try {
    const {id}  = req.params;
    const {role, firstName, lastName, email, phoneNumber, password} = req.body;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: `User with id:${id} not found` });
    }

    // Update the spot attribute
    user.role = role
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.phoneNumber = phoneNumber
    user.password = password
    
    await user.save();

    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
});

/* DELETE */
router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
      return res.status(422).json({ error: "Invalid user. It should be a whole number" });
    }

    const deletedUser = await Spot.destroy({
      where: {
        id: id
      }
    });

    if (deletedUser === 0) {
      return res.status(404).json({ error: `User with id:${id} not found` });
    }

    res.json({ message: `User with id:${id} was deleted` });
  } catch (error) {
    next(error);
  }
});


module.exports = router;