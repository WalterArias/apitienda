//librerias base
const express = require("express");
const app = express();
const cors = require("cors");
const authJwt = require("./middlewares/auth");

// middleware de la app
app.use(cors());
app.use(express.json());

//llamamos la libreria de conexion
const conexion = require("./models/bd_conexion");
conexion();
// rutas globales de la app

const productoRta = require("./routes/productos");
const usuariosRta = require("./routes/usuarios");
const categoriasRta = require("./routes/categorias");

// usamos las rutas

authJwt(app);

app.use("/api", productoRta);
app.use("/api", usuariosRta);
app.use("/api", categoriasRta);

app.listen(4000, () => {
  console.log(`listen ${4000}`);
});
