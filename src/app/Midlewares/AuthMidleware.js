const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Authentication token doesn't exist",
    });
  }

  const [, token] = auth.split(" ");

  try {
    //O decoded retorna um boolean para saber se o token esta decodificado ou não
    const decoded = await promisify(jwt.verify)(token, config.secret);
    if (!decoded) {
      return res.status(400).json({
        error: true,
        code: 130,
        message: "expired token",
      });
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch {
    return res.status(400).json({
      error: true,
      code: 130,
      message: "invalid token",
    });
  }
};
