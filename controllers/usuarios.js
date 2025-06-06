//instanciamos la capa modelo correspondiente
import bcrypt from "bcryptjs";
import Usuarios from "../models/usuarios";
import jwt from "jsonwebtoken";
// node nativo : fs : filessystem instanciamos para manipular el sistema de archivos del servidor
import fs from "fs";
// modulo nativo de node util para manejar las rutas
import path from "path";

const listartodos = async (req, res) => {
  try {
    // consultar todos sin filtro
    const listaUsuarios = await Usuarios.find().exec();
    res.status(200).send({
      exito: true,
      listaUsuarios,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: "Error en la consulta",
    });
  }
};

/** 
@description funcion que hace la creacion o registro  de los usuarios en el sistema
@author Waloson
@param req la peticion con la data del formulario de registro del usurioa
@param res   falso si no existe el usuario, true y mensaje de exito si se crea, false y mensaje de error si no ingresa la password
@version 01 -24-02-2025
@callback funcion asincronica que ejecuta la api
*/

const registro = async (req, res) => {
  //recibir la data
  const {
    nombre,
    email,
    password,
    telefono,
    esadmin,
    direccion,
    zip,
    ciudad,
    pais,
  } = req.body;

  const data = {
    nombre,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
    telefono,
    esAdmin: esadmin,
    direccion,
    zip,
    ciudad,
    pais,
  };

  const usuarioExiste = await Usuarios.findOne({ email });

  if (usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya esta registrado en el sistema",
    });
  }

  try {
    //objeto
    const usuarioNuevo = new Usuarios(data);
    await usuarioNuevo.save();
    res.send({
      estado: true,
      mensaje: "usuario creado",
    });
  } catch (error) {
    res.send({
      estado: false,
      mensaje: "usuario No creado",
      error,
    });
  }
};

/** 
@description funcion que hace el login o ingreso al sistema con autenticacion de 2 factores
@author Waloson
@param req la peticion con usuario y password
@param res   falso si no existe el usuario, si existe devuelve true y el token en formato json con ventana de vida de 4h
@version 01 -24-02-2025
@callback funcion asincronica que ejecuta la api
@function login del sistema
@class Usuarios
*/

const login = async (req, res) => {
  // recibir data: user / pass
  const { email, pwd } = req.body;

  //validar  que el usuario exista en la bd
  const usuarioExiste = await Usuarios.findOne({ email });
  /*   console.log(usuarioExiste); */
  if (!usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "usuario no existe en la Bd !",
    });
  }
  //validar las credenciales
  if (usuarioExiste && bcrypt.compareSync(pwd, usuarioExiste.passwordHash)) {
    // Autenticacion de 2 factores con generacion del token

    const token = jwt.sign(
      //datos a codificar en el token
      {
        userId: usuarioExiste.id,
        isAdmin: usuarioExiste.esAdmin,
      },
      // salt de la codificada o hashing o encriptado
      "seCreTo",
      // vida util del token
      { expiresIn: "4h" }
    );

    return res.send({
      estado: true,
      mensaje: "ingreso exitoso al sistema",
      token,
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "Credenciales erroneas, intente de nuevo !",
    });
  }
};

//sube la imagen del usuario
const subirImagen = async (req, res) => {
  try {
    // Validar si se subió un archivo
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "No se ha subido ninguna imagen",
      });
    }
    // validar la extension de la imagen
    const { originalname, filename, path: filePath } = req.file;
    const extension = originalname.split(".").pop().toLowerCase();
    // Validar extensión de la imagen
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extension)) {
      await fs.promises.unlink(filePath); // Eliminar archivo inválido
      return res.status(400).json({
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      });
    }

    // Actualizar usuario con la imagen subida
    const usuarioActualizado = await Usuarios.findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });

    return res.status(200).json({
      estado: true,
      user: usuarioActualizado,
      //file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      estado: false,
      nensaje: "Error al procesar la imagen",
      error: error.message,
    });
  }
};

// retorna la ruta de la imagen
const avatar = (req, res) => {
  // Sacar el parametro de la url
  const { file } = req.params;

  // Montar el path real de la imagen
  const filePath = `./uploads/usuarios/${file}`;

  // Comprobar que existe
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen",
      });
    }

    // Devolver un file
    return res.sendFile(path.resolve(filePath));
  });
};

export { listartodos, registro, login, subirImagen, avatar };
