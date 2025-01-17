const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require("bcrypt");
const router = express.Router();

// router.post('/authenticate', async (req, res) => {
//   const { email, password } = req.body;
//   const authHeader = req.headers['authorization'];

//   if (authHeader) {
//     try {
//       const token = authHeader.split(' ')[1];
//       if (!token) {
//         return res.status(401).json({ message: 'Token not provided' });
//       }
      

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }

//       const newToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       return res.json({ token: newToken });
//     } catch (error) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Email or password is incorrect' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Email or password is incorrect' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



module.exports = router;