const AutModel = require("../Model/Aut");

const Signup = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    let UserFound = await AutModel.findOne({ Email: Email });
    if (UserFound) {
      return res.status(200).json({
        status: "error",
        message: "Email already exists",
      });
    }
    console.log(Email, Password);
    if (Email.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Email is required",
      });
    }
    if (Password.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Password is required",
      });
    }
    let data = await AutModel.create(req.body);
    if (data) {
      res.status(200).json({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    if (Email.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Email is required",
      });
    }
    if (Password.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Password is required",
      });
    }
    let data = await AutModel.findOne({ Email: Email, Password: Password });
    if (data) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "success",
      message: error.message,
    });
  }
};

module.exports = { Signup, Login };
