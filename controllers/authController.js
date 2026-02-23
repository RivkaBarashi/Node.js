const User = require("../models/User");

// פונקציית הרשמה
const register = async (req, res) => {
  try {
    // אם רוצים לבדוק נתון מהבקשה
    const { username, password } = req.body;

    // יוצרים משתמש חדש לפי המודל
    const user = new User({ username, password });

    // שומרים במסד הנתונים
    await user.save();

    // מחזירים תשובה תקינה
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// פונקציית התחברות (placeholder)
const login = async (req, res) => {
  res.send("login placeholder");
};

// יוצאים מהקובץ עם הפונקציות
module.exports = { register, login };
