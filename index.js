const express = require("express");
const config = require("config");

const app = express();

require("./tools/config")();
require("./tools/cors")(app);
require("./tools/routes")(app);

const db = require("./tools/database");

const port = config.get("PORT");
app.listen(port, () => console.log(`Listening on port ${port} ...`));
