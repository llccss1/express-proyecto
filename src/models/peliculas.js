const mongoose = require("mongoose");

const peliculasSchema = mongoose.Schema(
    {
        idPersonaje: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Personajes",
            require: true,
        },
        nombrePelicula: {
            type: String,
            require: true,
        },
        descripcion: {
            type: String,
        },
    }
);

module.exports = mongoose.model("Peliculas", peliculasSchema);