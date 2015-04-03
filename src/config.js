// Load different configs for production or development

let configFile = "dev.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prod.js";
}

const config = require("../config/" + configFile);

export default config;
