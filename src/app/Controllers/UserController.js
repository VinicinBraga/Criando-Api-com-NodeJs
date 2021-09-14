const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");

class UserController {
  show(req, res) {
    const users = ["João", "Pedro"];
    return res.status(200).json({
      error: false,
      users,
    });
  }
  async store(req, res) {
    //Validação com o yup
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    if (!(await schema.isType(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Error to insert user on MongoDB",
      });
    }

    //desestruturação dos dados da req
    const { name, email, password } = req.body;

    //criarndo a constante data com os dados
    const data = { name, email, password };

    //criptografia com o bcrypty
    data.password = await bcrypt.hash(data.password, 8); //cria um criptografia de 8 caracteres

    //inserção no banco de dados
    await User.create(data, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error to insert user on MongoDB",
        });
      }
      return res.status(200).json({
        error: false,
        message: "successfully registered user",
      });
    });
  }
}

module.exports = new UserController();
