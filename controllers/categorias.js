/**
 * @description: Controlador para las categorias
 *
 * */

import Categoria from "../models/categorias";

// toda la logica de un crud tipico listartodos, listarpor id, crear, actualizar, borrar...

const listartodas = async (req, res) => {
  try {
    // consultar todos sin filtro
    const listaCategorias = await Categoria.find().exec();
    res.status(200).send({
      exito: true,
      listaCategorias,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

//crear nuevo
const nueva = async (req, res) => {
  // llega el objeto en el body del request
  const { nombre, icono, color } = req.body;
  const datos = { nombre, icono, color };
  
  try {
    // instanncia del modelo Producto (collection)
    const categoriaNueva = new Categoria(datos);
    // salvamos en mongo
    await categoriaNueva.save(); //escribe en mongo
    return res.send({
      estado: true,
      mensaje: "insercion exitosa !",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `ha ocurrido un error en la consulta: ${error}`,
    });
  }
};

// buscarpor id o por otro parametro
const buscarxid = async (req, res) => {
  // recibimos el parametro por el cual debo buscar y eliminar
  const { id } = req.params;

  try {
    // logica de buscar y mostrar el resultado del query
    //let consulta = await Producto.find({ id: req.params.id }).exec();
    const consulta = await Categoria.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "exito !",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "error, no fue posible encontrar el registro !",
      consulta,
    });
  }
};

// actualizar de acuerdo al id del producto
const actualizarxid = async (req, res) => {
  //recibe el parametro de la consulta
  const { id } = req.params;

  //payload que viene en el body :: los datos que manda el formulario
  const { nombre, icono, color } = req.body;
  const datos = { nombre, icono, color };

  try {
    const consulta = await Categoria.findByIdAndUpdate(id, datos).exec();
    return res.send({
      estado: true,
      mensaje: "documento creado !",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "ocurrió un error en la insercion",
    });
  }
};

//borrar de acuerdo al id  :::: RECUERDE QUE ESTE ES UN BORRADO DIDACTICO - NO LO USE EN EL MUNDO REAL
const borrarxid = async (req, res) => {
  //recibimos el parametro
  const { id } = req.params;

  try {
    const consulta = await Categoria.findOneAndDelete({ _id: id }).exec();
    //const consulta = await Producto.findByIdAndDelete(id).exec();

    return res.send({
      estado: true,
      mensaje: "borrado exitosa !",
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "error !",
      error,
    });
  }
};

export {
  listartodas,
  nueva,
  buscarxid,
  borrarxid,
  actualizarxid,
};