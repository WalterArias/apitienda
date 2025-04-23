// rutas para consumir el modulo productos del SERVICIO ECOMMERCE

import express from "express";
import multer from "multer";
import usuariosCtr from "../controllers/usuarios.js";

const router = express.Router();

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/usuarios/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

// Rutas del módulo usuarios
router.get("/usuarios/listartodos", usuariosCtr.listartodos);
router.post("/usuarios/registro", usuariosCtr.registro);
router.post("/usuarios/login", usuariosCtr.login);
router.post(
  "/usuarios/subirimagen/",
  uploads.single("file0"),
  usuariosCtr.subirImagen
);
router.get("/usuarios/avatar/:file", usuariosCtr.avatar);

// Ejemplo de rutas comentadas para productos (puedes descomentar si tienes los controladores)
// import productoCtr from "../controllers/productos.js";
// router.get("/producto/buscarxid/:id", productoCtr.buscarxid);
// router.delete("/producto/borrarxid/:id", productoCtr.borrarxid);
// router.put("/producto/actualizarxid/:id", productoCtr.actualizarxid);

export default router;
