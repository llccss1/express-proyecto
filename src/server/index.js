const express = require("express");
const bodyParser = require("body-parser");
const characters = require("../data/personajes.json");
const movies = require("../data/peliculas.json");
const { MongoClient } = require('mongodb'); //carho el modulo de mongodb

/* //esto lo traje de mongodb
//conexion a mongodb
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://lucasq:lucasq@cluster0.vyn44.mongodb.net/ejemploDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//fin conexion a mongodb
*/

const app = express();
const PORT = 3000;

///// conexion a la db de manera sincrona
//estas variables lo definimos afuera para poder utilizarlas en todas las funciones
let dataBaseObject = {};
let characterCollectionObj = {};
let movieCollectionObj = {};

//agregando async informamos que la funcion es asincrona
const dbConnection = async () => { 
    const uri = "mongodb+srv://lucasq:lucasq@cluster0.vyn44.mongodb.net/ejemploDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        //conectar el backend con el cluster de mongodb
        await client.connect();
        dataBaseObject = await client.db("ejemploDB");
        characterCollectionObj = dataBaseObject.collection("personajes");
        moviesCollectionObj = dataBaseObject.collection("peliculas");
        console.log("Cloud DB Connected - Mongo DB");//mensaje para ver si se conectó correctamente
    } catch (error) {
        console.log("=====>",error);
    }
};
dbConnection().catch(console.error);
///// fin - conexion a la db de manera sincrona

const mappedCharacters = characters.map((item) => {
  return {
    ...item,
    img: `http://localhost:${PORT}/${item.img}`,
  };
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---- Recurso PERSONAJE ----//

// metodo get de personajes //
app.get("/personajes", async (req, res) => {
  try {
    const allPersonajes = await characterCollectionObj.find({}).toArray();
    res.status(200).send(allPersonajes);
  } catch (error) {
    console.log("=====>",error);
    res.status(500).send(error);
  }
});

// metodo get por id //
app.get("/personajes/:id", (req, res) => {
  const character = mappedCharacters.find((item) => item.id === req.params.id);
  //usamos find xq el id es univoco y si encuentra solo devuelve 1

  if (character) {
    res.status(200).send(character);
  } else {
    res.status(404).send(`Cannot find the character with id ${req.params.id}`);
  }
});

// metodo get personajes por casa //
app.get("/personajes/casa/:casa", (req, res) => {
    const character = mappedCharacters.filter((item) => item.casa === req.params.casa);
    //usamos filter xq nos puede devolver mas de un elemento

    if (character.length) {
        res.status(200).send(character);
      } else {
        res.status(404).send(`Cannot find the character with casa ${req.params.casa}`);
    }
});

// metodo post para personajes //
app.post("/personajes", (req, res) => {
    //console.log(req.body);
    const newValues = req.body;
    const response = [...mappedCharacters, newValues];
    res.status(200).send(response);
});

// metodo put para personajes //
app.put("/personajes/:id", (req, res) => {
    //console.log(req.body);    
    const doesItExist = mappedCharacters.some((item) => item.id === req.params.id);

    if (!doesItExist) {
        res.status(404).send(`Cannot find the character with id ${req.params.id}`);
    } else if (Object.keys(req.body).length === 0) {
        res.status(400).send(`El body está vacío`);
    } else {
        const character = mappedCharacters.map((item) => {
            return (item.id === req.params.id) ? req.body : item;
        });
        res.status(200).send(character);
    };    

});

// metodo delete para personajes //
app.delete("/personajes/:id", (req, res) => {
    //console.log(req.body);
    const doesItExist = mappedCharacters.some((item) => item.id === req.params.id);

    if (doesItExist) {
        const character = mappedCharacters.filter(
            (item) => item.id !== req.params.id
        )
        res.status(200).send(character);
    } else {
        res.status(404).send("No se elimino xq no se encontró el registro");
    };
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
