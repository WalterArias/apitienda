// rutas para consumir el modulo categorias del SERVICIO ECOMMERCE
import express from "express";
import { listartodas, nueva } from "../controllers/categorias";

const router = express.Router();

// definimos las rutas para las categorías
router.get("/categorias/listartodas", listartodas);
router.post("/categorias/nueva", nueva);

export default router;
