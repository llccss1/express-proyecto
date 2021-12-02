const mongoose = require("mongoose");

const personajesSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
        },
        bio: {
            type: String,
        },        
        img: {
            type: String,
        },
        aparicion: {
            type: String,
        },
        casa: {
            type: String,
            require: true,
            enum: ["Marvel", "DC"],
        },
    }
);

module.exports = mongoose.model("Personajes", personajesSchema);