// instanciar la libreria mongoose
import mongoose from "mongoose";

const conexion = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/etienda");
    console.log("conexion exitosa !");
  } catch (error) {
    console.log(`error en la conexion: ${error}`);
    throw new Error(error); //
  }
};

export default conexion;
