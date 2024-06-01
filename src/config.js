require("dotenv").config();

module.exports = {
  //variablers globales
  app: {
    port: process.env.PORT || 4000,
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || '',
    port:process.env.MYSQL_PORT || '3306'
  },
};
