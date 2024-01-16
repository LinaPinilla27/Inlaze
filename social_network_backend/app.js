const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./db");
const cors = require('cors');

const app = express();
app.use(cors());

async function inicializarBaseDeDatos() {
  try {
    const user = require('./models/user');
    const post = require('./models/post');

    await sequelize.sync(); // No uses { force: true } en producción
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

inicializarBaseDeDatos();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("La aplicación está escuchando en el puerto 3000");
});
