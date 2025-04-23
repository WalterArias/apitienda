import { Schema, model } from "mongoose";

const pedido_detalleSchema = new Schema({
  cantidad: {
    type: Number,
    required: true,
  },
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
  },
  pedido: {
    type: Schema.Types.ObjectId,
    ref: "Pedido",
    required: true,
  },
});

const PedidoDetalle = new model("PedidoDetalle", pedido_detalleSchema);

export default PedidoDetalle;
