const User = require("../models/user");

async function register(req, res) {
  try {
    const { fullName, age, email, password } = req.body;

    // Crear el usuario en la base de datos
    const newUser = await User.create({
      fullName,
      age,
      email,
      password,
    });

    // Enviar una respuesta con el nuevo usuario creado
    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    // Buscar el usuario por su ID en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
}

module.exports = { register, getUserById };
