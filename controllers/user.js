const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Fields required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};