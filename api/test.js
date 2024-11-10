module.exports = (req, res) => {
    res.json({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
  };