/**
 * controlador para el manejo de los productos
 */

// conectamos el controlador con su modelo correspondiente
import Producto from "../models/productos";
//import Categoria from "../models/categorias";

// toda la logica de un crud tipico listartodos, listarpor id, crear, actualizar, borrar...

/** 
@description funcion que hace el login o ingreso al sistema con autenticacion de 2 factores
@author Waloson
@param req la peticion con usuario y password
@param res falso si no existe el usuario, si existe devuelve true y el token en formato json con ventana de vida de 4h
@version 01 -24-02-2025
@callback funcion asincronica que ejecuta la api
@function login del sistema
@class Productos
*/

const listartodos = async (req, res) => {
  try {
    // consultar todos sin filtro
    const listaProductos = await Producto.find().exec();
    res.status(200).send({
      exito: true,
      listaProductos,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

//crear nuevo
const nuevo = async (req, res) => {
  // llega el objeto en el body del request
  const {
    nombre,
    descripcion,
    imagen,
    marca,
    precio,
    existencia,
    rating,
    numRevisiones,
    estaOfertado,
    categoria,
  } = req.body;

  const datos = {
    nombre,
    descripcion,
    imagen,
    marca,
    precio,
    existencia,
    rating,
    numRevisiones,
    estaOfertado,
    categoria,
  };

  try {
    // instanncia del modelo Producto (collection)
    const productoNuevo = new Producto(datos);
    // salvamos en mongo
    await productoNuevo.save(); //escribe en mongo

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

  /*  if (req.params.id) {
    let id = id;
  } else {
    console.log("le falta el parametro");
  } */

  try {
    // logica de buscar y mostrar el resultado del query
    //const consulta = await Producto.find({ id: req.params.id }).exec();
    const consulta = await Producto.findById(id).populate("categoria").exec();
    return res.send({
      consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "error, no fue posible encontrar el registro !",
    });
  }
};

// actualizar de acuerdo al id del producto
const actualizarxid = async (req, res) => {
  //recibe el parametro de la consulta
  const { id } = req.params;

  //payload que viene en el body :: los datos que manda el formulario
  const {
    nombre,
    descripcion,
    imagen,
    marca,
    precio,
    existencia,
    rating,
    numRevisiones,
    estaOfertado,
  } = req.body;

  const datos = {
    nombre,
    descripcion,
    imagen,
    marca,
    precio,
    existencia,
    rating,
    numRevisiones,
    estaOfertado,
  };

  try {
    const consulta = await Producto.findByIdAndUpdate(id, datos).exec();
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
  console.log(id);

  try {
    const consulta = await Producto.findOneAndDelete({ _id: id }).exec();
    //const consulta = await Producto.findByIdAndDelete(id).exec();
    console.log(consulta);
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

const totalProductos = async (req, res) => {
  try {
    const consulta = await Producto.countDocuments().exec();
    //const consulta = await Producto.findByIdAndDelete(id).exec();
    console.log(consulta);
    return res.send({
      totalProductos: consulta,
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
  listartodos,
  nuevo,
  buscarxid,
  borrarxid,
  actualizarxid,
  totalProductos,
};
