import dotenv from 'dotenv'
import Sequelize from 'sequelize';

const config = dotenv.config()

const connection = new Sequelize(
 config.parsed.DB_NAME,
 config.parsed.DB_USER,
 config.parsed.DB_PASSWORD,
  {
    host: config.parsed.DB_HOST,
    dialect: 'mysql'
  }
);

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default connection;