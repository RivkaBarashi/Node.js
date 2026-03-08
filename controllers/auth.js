
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'viewer' 
    });

    await newUser.save();

    
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "user created successfully",
      token
    });

  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "login successful",
      token
    });

  } catch (err) {
    next(err);
  }
};