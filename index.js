// On importe express (module tiers)
const express = require("express");

// On importe le module swagger-ui-express
// qui nous permet de créer la documentation
// de notre API avec Swagger
const swaggerUi = require("swagger-ui-express");

// On importe yaml pour parser le fichier
// swagger.yaml qui contient la documentation
// de notre API
const yaml = require("yaml");

// On importe le module fs qui permet de lire
// des fichiers sur le système de fichiers
// (ici on va lire le fichier swagger.yaml)
const fs = require("fs");

// On importe le fichier swagger.yaml
// qui contient la documentation de notre API
const swaggerSpec = yaml.parse(fs.readFileSync("./swagger.yaml", "utf8"));

// On importe notre fonction qui
// vient créer les routes de l'application
const createRoutes = require("./routes");

// On initialise une application avec Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// On défini le moteur de rendu, pour utiliser EJS
app.set("view engine", "ejs");

// On défini le dossier contenant les views
// 1. Variable propre à Express (configuration)
// 2. Nom du dossier que nous avons créé
app.set("views", "views");

// On enregistre le routeur qu'on a créé
// dans le dossier `./routes` (fichier `index.js`).
app.use(createRoutes());

// On enregistre le routeur de la documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// On lance le serveur sur le port 5500 local
app.listen(5500, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("Serveur lancé sur le port 5500");
});
