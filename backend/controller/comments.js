import { commentModel } from '../model/comments.js'
import { userModel } from '../model/users.js'
import Responses from '../config/responses.js'

function catchError(error, res) {
  res.status(400).json({ code: Responses.fail, error }
  )
}

export const getAllComments = (req, res) => {
  commentModel.findAll()
    .then(async crud => {
      if (crud.length != 0) {
        crud.sort((a, b) => {
          return b.createdAt - a.createdAt
        });
        const new_crud = await Promise.all(crud.map(async element => {
          const user = await userModel.findByPk(element.UserId)
          return { ...element.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen }
        }))
        res.status(200).json(new_crud)
      }
      else res.status(400).json({ code: Responses.noContend })
    })
    .catch(error => catchError(error, res))
}
export const getUniqueComment = (req, res) => {
  commentModel.findOne({ where: { id_comment: req.params.id } })
    .then(crud => {
      if (crud.length != 0) res.status(200).json(crud)
      else res.status(400).json({ code: Responses.noContend })
    })
    .catch(error => catchError(error, res))
}
export const addComment = (req, res) => {
  const { note, id } = req.body
  if (note === '') catchError({ error: Responses.missData }, res)
  else {
    commentModel.create({ note, UserId: id })
      .then(async crud => {
        const user = await userModel.findByPk(crud.UserId)
        res.status(200).json({ ...crud.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen })
      })
      .catch(error => catchError(error, res))
  }
}
export const updateComment = (req, res) => {
  const { id_comment, note } = req.body
  if (note === '') catchError({ error: Responses.missData }, res)
  else {
    commentModel.update({ note }, { where: { id_comment } })
      .then(() => {
        req.params.id = id
        getUniqueComment(req, res)
      })
      .catch(error => catchError(error, res))
  }
}
export const deleteComment = (req, res) => {
  const { id_comment } = req.body
  commentModel.destroy({ where: { id_comment } })
    .then(crud => {
      if (crud != 0) res.status(200).json({ code: Responses.deleted })
      else res.status(400).json({ code: Responses.noContend })
    })
    .catch(error => catchError(error, res))
}

export const getAllCommentsUser = (req, res) => {
  commentModel.findAll({ where: { UserId: req.params.id } })
    .then(async crud => {
      if (crud.length != 0) {
        crud.sort((a, b) => {
          return b.createdAt - a.createdAt
        });
        const new_crud = await Promise.all(crud.map(async element => {
          const user = await userModel.findByPk(element.UserId)
          return { ...element.dataValues, user: user.dataValues.name, imagen: user.dataValues.imagen }
        }))
        res.status(200).json(new_crud)
      }
      else res.status(200).json([])
    })
    .catch(error => catchError(error, res))
}