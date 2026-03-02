function errorHandler(err, req, res, next) {
  console.error(err.stack); // מדפיס לשורת הפקודה את השגיאה
  res.status(500).json({ error: err.message || 'Server error' }); // שולח תגובה מסודרת ללקוח
}

module.exports = errorHandler;