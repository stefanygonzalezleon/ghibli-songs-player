// para crear servidor
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// routing
const app = express();
const port = process.env.PORT || 5000;
const path = require('node:path');

app.use(cors())
app.use(express.static('src/songs/'))
app.use(express.json()) //que todo componente va a ser de tipo json

const songsRouter = require("./routes/songs");
app.use("/songs", songsRouter);

// ------ Configure swagger docs ------
const options = {
    swaggerDefinition: {
      info: {
        title: "Ghibli Songs API",
        version: "1.0.0",
        description: "My API for doing cool stuff!",
      },
    },
    apis: [path.join(__dirname, "/routes/*.js")],
};
const swaggerSpecs = swaggerJsdoc(options);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// en que puerto esta el servidor
app.listen(port, () => {
    console.log('Server corriendo: http://localhost:' + port)
})