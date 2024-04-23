import { sequelize } from './db.js'
import { commentModel } from '../model/comments.js'
import { userModel } from '../model/users.js'

export async function syncDB() {
  await sequelize.authenticate()
    .then(() => console.log('Database status: OK'))
    .catch(error => console.error(`Database status: ${error}`))

  await userModel.sync({ force: false, alter: false }) // force true restart all database
    .then(() => console.log('Users table status: OK'))
    .catch(error => console.error(`Users table status: ${error}`))

  await commentModel.sync({ force: false, alter: false })
    .then(() => console.log('Comment table status: OK'))
    .catch(error => console.error(`Comment table status: ${error}`))
}