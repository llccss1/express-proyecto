const express = require("express");
const router = express.Router();
const personajesController = require("../controllers/personajesController");

router.get("/", personajesController.getPersonajes);

router.get("/", () => {});

module.exports = router;