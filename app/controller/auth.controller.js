const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const cache = require("../../config/cache")

const User = require("../model/user.model");

const login = async (req, res) => {
  try {
    const user = await User.query()
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "1h",
      });

      user_data.token = token;

      res.status(200).json({
        message: "Login success!",
        data: user_data
      });

    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  try {
    let userCheck = await User.query().where("email", req.body.email).first();
    if (userCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email not available!",
      });
    }

    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const logout = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");
    cache.set(token, 'revoked');
      res.status(200).json({
        status: 200,
        message: "OK",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
  register,
  logout,
};
