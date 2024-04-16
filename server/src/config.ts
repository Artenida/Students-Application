import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const createDatabaseConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  connection.connect((error) => {
    if (error) {
      console.log("Error connecting database");
    } else {
      console.log("Successful");
    }
  });

  const getConnection = () => {
    return connection;
  };

  const closeConnection = () => {
    connection.end((error) => {
      if (error) {
        console.log("Error closing connection");
      } else {
        console.log("Connection closed successfully");
      }
    });
  };

  return {
    getConnection,
    closeConnection,
  };
};

export default createDatabaseConnection;
