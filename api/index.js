const express = require("express");
const app = express();
const routes = require("./routes");
const port = process.env.MY_APP_PORT || 1000;
const connectToDatabase = require("./database");
require("dotenv").config();
const functions = require("firebase-functions");

const cors = require("cors");
const logger = require("./logger");

async function startServer() {
  await connectToDatabase();
  app.use(express.json());
  app.use(cors());

  app.use("/api", routes);

  app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500).send({ error: err.message });
  });

  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}/`);
  });
}

// Menambahkan exports.api = functions
exports.api = functions.https.onRequest(app);

// Memanggil fungsi startServer
startServer();
