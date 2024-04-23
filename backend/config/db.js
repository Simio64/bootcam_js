import { Sequelize } from 'sequelize'

/* const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_DATABASE_TEST, NODE_ENV } = process.env
let Database

if (NODE_ENV != 'production') Database = MYSQL_DATABASE_TEST
else Database = MYSQL_DATABASE
 */
/* const sequelize = new Sequelize({
    logging: false, 
    dialect : 'mysql',
    username : MYSQL_USER,
    password : MYSQL_PASSWORD,
    host : MYSQL_HOST,
    port : MYSQL_PORT,
    database: Database
}) */

/* if (NODE_ENV === 'test') {
    sequelize.dropAllSchemas()
} */

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dataBase.sqlite',
  logging: false
});

export { sequelize }