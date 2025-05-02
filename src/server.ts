import express from "express";
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";
import colors from "colors";

// conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue('Conexión exitosa a la BD'));
  } catch (error) {
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}

connectDB();

// Instancia de express
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use("/api/products", router);

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))



export default server;
