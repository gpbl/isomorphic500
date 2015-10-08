// Load different configs for production or development

let configFile = "dev.js";

if (process.env.NODE_ENV === "production") {
  configFile = "prod.js";
}

export default require(`../config/${configFile}`);
