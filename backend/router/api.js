import express from 'express'
import { getAllComments, addComment, getUniqueComment, updateComment, deleteComment, getAllCommentsUser } from '../controller/comments.js'
import { getAllUsers, getUser, addUser, updateUser, deleteUser, login, loginToken } from '../controller/users.js'
import { validate, validateIsRealUser, validateIsAdmin } from '../middleware/token.js'
import { savedFile, validateFile } from '../middleware/multer.js'
import { validate as validateMail } from '../middleware/validator.js'

const router = express.Router()
const default_response = (_req, res) => res.status(200).json({ code: 'OK', SERVER_STATUS: 'READY' })
const viewData = (req, _res, next) => {
    console.log(req.body)
    next()
}

router.get('/', default_response)

router.get('/user', validateIsAdmin, getAllUsers)
router.get('/user/:id', validate, getUser)
router.post('/user', addUser)
router.put('/user', validateIsRealUser, updateUser)
router.delete('/user', validateIsRealUser, deleteUser)

router.post('/user/login', login)
router.post('/user/login_token', validate, loginToken)

router.get('/imagen', (_req, res) => res.sendFile('/readme.txt'))
router.post('/imagen', savedFile, validateFile)

router.get('/comments', validate, getAllComments)
router.get('/comments/:id', validate, getUniqueComment)
router.post('/comments', validateIsRealUser, addComment)
router.put('/comments', validateIsRealUser, updateComment)
router.delete('/comments', validateIsRealUser, deleteComment)

router.get('/comments/user/:id', validate, getAllCommentsUser)

export { router }