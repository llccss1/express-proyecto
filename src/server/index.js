const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const MONGO_URL = 
    "mongodb+srv://lucasq:lucasq@cluster0.vyn44.mongodb.net/ejemploDB?retryWrites=true&w=majority";

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