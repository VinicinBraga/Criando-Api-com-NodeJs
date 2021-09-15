const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");

class LoginController {
  async index(req, res) {
    const { email, password } = req.body;

    //Verifica se o usuario existe atraves do email
    const userExist = await User.findOne({ email });

    //Se ele existe
    if (!userExist) {
      return res.status(400).json({
        error: true,
        message: "invalid email",
      });
    }
    //Compara se password é a correta
    if (!(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({
        error: true,
        message: "invalid password",
      });
    }
    //Retorna os dados do usuario e a codificação atraves do id e a chave secreta.
    return res.status(200).json({
      user: {
        name: userExist.name,
        email: userExist.email,
      },
      token: jwt.sign(
        {
          id: userExist.id,
        },
        config.secret,
        { expiresIn: config.expireIn }
      ),
    });
  }
}

module.exports = new LoginController();
