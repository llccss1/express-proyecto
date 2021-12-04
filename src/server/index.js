require("dotenv").config(); //para configurar las variables de entorno

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_DB_URI;   

const app = express();
const router = require("../routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);


const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Conexion a DB exitosa");

        app.listen({ port: PORT }, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        console.log(`No fue posible conectarse a la base de datos`);
    }
};

connectDb();