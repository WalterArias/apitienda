//librerias base
import express from "express";
import cors from "cors";
import authJwt from "./middlewares/auth";
import conexion from "./models/bd_conexionOld";
import productoRta from "./routes/productos";
import usuariosRta from "./routes/usuarios";
import categoriasRta from "./routes/categorias";

const app = express();

// middleware de la app
app.use(cors());
app.use(express.json());

//llamamos la libreria de conexion
conexion();

// usamos las rutas
authJwt(app);

app.use("/api", productoRta);
app.use("/api", usuariosRta);
app.use("/api", categoriasRta);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});