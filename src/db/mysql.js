const mysql = require("mysql2");
const config = require("../config.js");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port,
};

let dbConnect = "";

function handleMySqlConnection() {
  dbConnect = mysql.createConnection(dbconfig);
  dbConnect.connect((err) => {
    if (err) {
      console.log(["db err"], err);
      setTimeout(handleMySqlConnection, 200);
    } else {
      console.log("Db conectada");
    }
  });

  dbConnect.on("error", (err) => {
    console.log(["db err"], err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleMySqlConnection();
    } else {
      throw err;
    }
  });
}

handleMySqlConnection();

function todos(tabla) {
  return new Promise((resolve, reject) => {
    dbConnect.query(`SELECT * FROM ${tabla}`, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `SELECT * FROM ${tabla} WHERE id=${id}`,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
}

function agregar(tabla, data) {
  if(data && data.id == 0 ){
    return insertar(tabla, data);
  }else {
    return actualizar(tabla, data)
  }
}

function insertar(tabla, data) {
  return new Promise((resolve, reject) => {
    dbConnect.query(`INSERT INTO ${tabla} SET ?`,data,(error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function actualizar(tabla, data) {
  return new Promise((resolve, reject) => {
    dbConnect.query(`UPDATE ${tabla} SET ? WHERE id = ?`,[data, data.id],(error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
    dbConnect.query(`Delete FROM ${tabla} WHERE id= ?`,data.id,(error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
};
