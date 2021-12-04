const models = require("../models");
//const mongoose = require("mongoose");

//const objectIdValidator = mongoose.types.ObjectId;

const getPeliculas = async (req, res) => {
    try {
        const response = await models.Peliculas.find();       

        return res.status(200).json(
            {
                data: response,
                error: false,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                msg: error,
                error: true,
            }
        ); 
    }
};

const getPeliculaById = async (req, res) => {
    try {

        const peliculaId = req.params.id;
        /*
        const isValid = objectIdValidator.isValid(peliculaId);
        if (!isValid) {
            res.status(500).json({
                data: `El valor ${peliculaId} no es un ID válido de MongoDB`,
                error: true,
              });
        }*/
      
        const response = await models.Peliculas.findById(peliculaId);
    
        if (response) {
            res.status(200).json({
            data: response,
            error: false,
            });
        } else {
            res.status(404).json({
            msg: "La película no existe",
            error: true,
            });
        }
        } catch (error) {
        return res.status(500).json({
            msg: error,
            error: true,
        });
    }
};
  

const deletePeliculas = () => console.log("delete peliculas");

module.exports = {
    getPeliculas,
    deletePeliculas,
};