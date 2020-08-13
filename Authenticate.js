  
const jwt = require("jsonwebtoken");
const config = require('./config.json')
//access only if user have token , (login required)
const Authenticate = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "Вы не авторизованы" });

    const verified = jwt.verify(token, config.secret);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Ваш токен не действителен" });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = Authenticate;