const bcrypt = require('bcryptjs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

/**
 * @route       GET /api/users/
 * @description Get a user's data
 * @access      Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

/**
 * @route       POST /api/users/register/
 * @description Register a new user
 * @access      Public
 */
router.post('/register', [
    check('email', 'A valid email is required').isEmail(),
    check('password', 'A password with 6 or more characters is required').isLength({ min: 6 }),
    check('username', 'A username is required').not().isEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, username } = req.body;

      const errors = [];
      const emailTaken = await User.findOne({ email });
      const usernameTaken = await User.findOne({ username });

      if (emailTaken) {
        errors.push({ msg: 'Email is already taken' });
      }
      
      if (usernameTaken) {
        errors.push({ msg: 'Username is already taken' });
      }

      if (errors.length) {
        return res.status(400).json({ errors });
      }

      const user = new User({
        email,
        password,
        username
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        id: user.id
      };

      jwt.sign(payload, process.env.JWT, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          throw err;
        }

        return res.json({ token: `Bearer ${token}` });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

/**
 * @route       POST /api/users/login/
 * @description Login a user
 * @access      Public
 */
router.post('/login', [
    check('password', 'A password is required').not().isEmpty(),
    check('username', 'A username is required').not().isEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { password, username } = req.body;
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        id: user.id
      };

      jwt.sign(payload, process.env.JWT, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          throw err;
        }

        return res.json({ token: `Bearer ${token}` });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;