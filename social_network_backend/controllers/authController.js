const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por su correo electrónico
    const user = await User.findOne({ where: { email } });

    if (!user || !await user.validPassword(password)) {
      return res.status(401).json({
        success: false,
        message: "Autenticación fallida",
      });
    }


    const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("JWT_SECRET is not defined in the environment variables.");
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en la autenticación:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
}

module.exports = { login };