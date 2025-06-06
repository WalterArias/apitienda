// rutas para consumir el modulo productos del SERVICIO ECOMMERCE

import express from "express";
const router = express.Router();

// instanciamos el controlador correspondiente
const productoCtr = require("../controllers/productos");
const authJwt = require("../middlewares/auth");

// rutas que entregara el modulo producto

router.get("/producto/listartodos", productoCtr.listartodos);
router.post("/producto/nuevo", productoCtr.nuevo);
router.get("/producto/buscarxid/:id", productoCtr.buscarxid);
router.delete("/producto/borrarxid/:id", productoCtr.borrarxid);
router.put("/producto/actualizarxid/:id", productoCtr.actualizarxid);
router.get("/producto/totalproductos", productoCtr.totalProductos);

export default router;
