import { syncDB } from '../config/sync.js'
import { baseDir } from '../../dirname.js'
import { router } from '../router/api.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { configDotenv } from 'dotenv'

const app = express()
configDotenv()
let server

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

syncDB()

app.use(express.static(path.join(baseDir, '/frontend/dist')))
app.use('/api', router)
app.get('**', (_req, res) => res.sendFile(path.join(baseDir, '/frontend/dist/index.html')))

if (process.env.SOCKET == 'false') {
  server = app.listen(process.env.PORT, () => {
    console.log(`Listen on port: ${process.env.PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
    console.log(`Socket status: ${process.env.SOCKET}`)
  })
}

export { app, server }