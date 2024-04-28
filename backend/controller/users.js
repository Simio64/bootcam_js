import { createToken, decode } from '../middleware/token.js'
import { userModel } from '../model/users.js'
import bcrypt from 'bcrypt'

function catchError(error, res) {
  res.status(400).json({ code: 'FAIL', error }
  )
}

export const getAllUsers = (req, res) => {
  userModel.findAll()
    .then(crud => {
      if (crud.length != 0) res.status(200).json(crud)
      else res.status(404).json({ code: 'NO CONTEND' })
    })
    .catch(error => catchError(error, res))
}

export const getUser = (req, res) => {
  userModel.findByPk(req.params.id)
    .then(crud => {
      if (crud.length != 0) {
        const { password_hash, id, name, is_admin, mail, imagen } = crud
        res.status(200).json({ id, name, mail, imagen })
      }
      else res.status(404).json({ code: 'NO CONTEND' })
    })
    .catch(error => catchError(error, res))
}
export const addUser = async (req, res) => {
  const { name, mail, password } = req.body
  const num = Math.floor((Math.random() * (14 - 1 + 1)) + 1)

  if (name === '' || mail === '' || password === '') catchError({ error: 'MISSING DATA' }, res)
  else {
    let password_hash = {}
    if (password) { password_hash = await bcrypt.hash(password, 10) }
    userModel.create({ name, mail, password_hash, imagen: `tiny/${num}.jpg` })
      .then(crud => {
        const { id, name, mail, is_admin, password_hash, imagen } = crud.dataValues
        const token = createToken({ id, is_admin })
        res.status(201).json({ id, name, mail, imagen, token })
      }) //created
      .catch(error => catchError(error, res))
  }
}

export const updateUser = async (req, res) => {
  const { id, name, mail, password } = req.body
  if (name === '' || mail === '' || password === '') catchError({ error: 'MISSING DATA' }, res)
  else {
    let password_hash = {}
    if (password) { password_hash = await bcrypt.hash(password, 10) }
    userModel.update({ name, mail, password_hash }, { where: { id } })
      .then(() => {
        req.params.id = id
        this.get_user(req, res)
      })
      .catch(error => catchError(error, res))
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.body
  userModel.destroy({ where: { id } })
    .then(crud => {
      if (crud.length != 0) res.status(200).json({ code: 'USER DELETED' })
      else res.status(404).json({ code: 'NO CONTEND' }) // no contend
    })
    .catch(error => catchError(error, res))
}

export const login = async (req, res) => {
  const { mail, password } = req.body
  try {
    const crud = await userModel.findOne({ where: { mail } })
    if (crud == null) res.status(401).json({ code: 'USER OR PASSWORD NO MATCH' })
    else {
      const { password_hash, id, name, is_admin, imagen } = crud
      const validate_password = await bcrypt.compare(password, password_hash)
      const token = createToken({ id, is_admin })
      validate_password ? res.status(200).json({ code: 'LOGGED', id, token, name, imagen }) : res.status(401).json({ code: 'USER OR PASSWORD NO MATCH' })
    }
  } catch (error) {
    catchError(error, res)
  }
}

export const loginToken = async (req, res) => {
  const { token } = req.body
  try {
    const { id } = decode(token)
    const crud = await userModel.findByPk(id)
    if (crud == null) res.status(401).json({ code: 'USER OR PASSWORD NO MATCH' })
    else {
      const { id, name, imagen } = crud
      res.status(200).json({ code: 'LOGGED', id, token, name, imagen })
    }
  } catch (error) {
    catchError(error, res)
  }
}