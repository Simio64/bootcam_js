require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const sync_db = require('../config/sync')
const path = require('path')

const directorio = require('../../dirname')

const app = express()
let server = null

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

sync_db()

app.use(express.static(path.join(directorio, '/frontend/dist')))
app.get('/', (req, res) => {
    res.sendFile(path.join(directorio, '/frontend/dist/index.html'))
})
app.use('/api', require('../router/api'))
app.use((req, res) => res.redirect('/'))

if (process.env.SOCKET == 'false') {
    server = app.listen(process.env.PORT, () => {
        console.log(`Listen on port: ${process.env.PORT}`)
        console.log(`Enviroment: ${process.env.NODE_ENV}`)
        console.log(`Socket status: ${process.env.SOCKET}`)
    })
}

module.exports = { app, server }