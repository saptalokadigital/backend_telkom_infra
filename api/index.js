const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const port = process.env.PORT || 1000;
const connectToDatabase = require("./database");

const cors = require("cors");
const logger = require("./logger");

async function startServer() {
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", routes);

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500).send({ error: err.message });
  });

  connectToDatabase()
    .then(() => {
      app.listen(port, () => {
        logger.info(`Server running at http://localhost:${port}/`);
      });
    })
    .catch((error) => {
      logger.error(error);
    });
}
module.exports = startServer;
