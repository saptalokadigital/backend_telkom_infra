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
  await connectToDatabase();
  app.use(express.json());
  app.use(cors());

  app.use("/api", routes);

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500).send({ error: err.message });
  });

  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}/`);
  });
}
module.exports = startServer;
