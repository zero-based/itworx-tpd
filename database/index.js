const path = require("path");
const envFile = path.join(__dirname, "../server/.env");

console.log(`ENV FILE: ${envFile}`)
require("dotenv").config({ path: envFile });

const mysql_import = require("mysql-import");
const importer = new mysql_import({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const schemaDir = path.join(__dirname, "./schema/");

importer
  .import(schemaDir)
  .then(() => {
    var files_imported = importer.getImported();
    console.log(`IMPORTED: ${files_imported.length} SQL file(s)`);
  })
  .catch((err) => {
    console.error(err);
  });
