const config = require("config");

module.exports = () => {
  if (!config.get("matchitoKey"))
    throw new Error("JWT private key is not set.");
  if (!config.get("PORT")) throw new Error("port key is not set.");
};
