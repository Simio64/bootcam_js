const sequelize = require('./db')
const Comment = require('../model/comments')
const User = require('../model/users')

async function sync_db() {
    await sequelize.authenticate()
        .then(() => console.log('Database status: OK'))
        .catch(error => console.error(`Database status: ${error}`))

    await User.sync({ force: false, alter: false }) // force true reinicia toda la base de datos
        .then(() => console.log('Users table status: OK'))
        .catch(error => console.error(`Users table status: ${error}`))

    await Comment.sync({ force: false, alter: false })
        .then(() => console.log('Comment table status: OK'))
        .catch(error => console.error(`Comment table status: ${error}`))
}

module.exports = sync_db