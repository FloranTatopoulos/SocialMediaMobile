// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const auth= require("../middleware/auth");

// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password, profileImage } = req.body;

  // Create a new user with the provided name, email, and password
 
  const user = new User({ name, email, password, profileImage });
  await user.save();

  // Return the new user as JSON
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
  // res.json(user);
});

router.get('/ ', auth, async (req, res) => {
    try {
      const userId = req.user.id;
 
      const user = await User.findById(userId);
 
      const userName = user.name;
      const profileImage = user.profileImage;
 
      res.json({ name: userName, profileImage });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
module.exports = router;